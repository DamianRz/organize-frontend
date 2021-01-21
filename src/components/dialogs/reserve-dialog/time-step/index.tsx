import React, { useEffect, useState, useContext } from 'react';
import { Button } from '../../../inputs/button';
import { CalendarBox } from './calendar-box/calendar-box';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import AvailableTimeActions from '../../../../actions/AvailableTime.actions';
import moment from 'moment';
import db from '../../../../config/firebase';
import { Text } from '../../../decorators/text';
import { Step } from '../../../containers/stepper/step';
import './time-step.scss';

export const TimeStep = (props: {
  reserveDate: Date;
  reserveHour: string;
  selectedBarber: any;
  barberId: number;
  onSelctDate: any;
  onSelctHour: any;
}) => {
  // fecha actual para obtener la data si no hay fecha seleccionada
  const currentDate = moment(new Date()).format().toString().split('T')[0];

  // list of all reserves: [ date: string, hours: string[] ]
  const [reservesList, setReservesList] = useState([]);
  // hours in HoursBox
  const [availableHours, setAvailableHours] = useState([]);
  // const [listHours, setListHours] = useState([]);
  const [barberShopTime, setBarberShopTime] = useState([]);
  const [chritmasTimes, setChritmasTimes] = useState([]);
  const [reserveDate, setReserveDate] = useState(undefined);
  const [reserveHour, setReserveHour] = useState(props.reserveHour || null);

  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const timeActions: AvailableTimeActions = new AvailableTimeActions();

  const getHoursByBarberShop = async () => {
    let response = await timeActions.getBarberShopTime();
    return response;
  };

  //! Chrtimas times
  const getChritmasTImeShop = async () => {
    let response = await timeActions.getChritmasTime();
    return response;
  };

  const nameParcerFunction = (name: string) => {
    return name.toLowerCase().replaceAll(' ', '.');
  };

  useEffect(() => {
    const normalHours = async () => {
      return await getHoursByBarberShop().then((response: any) => {
        setBarberShopTime(response);
      });
    };

    //! Chritmas time init()
    const chritmasTimes = async () => {
      return await getChritmasTImeShop().then((response: any) => {
        setChritmasTimes(response);
      });
    };

    //? Init times
    normalHours();
    chritmasTimes();

    //? execute useEffect and charge dates and hours
    setReserveDate(props.reserveDate);
  }, []);

  useEffect(() => {
    const getReservesTimes = async () => {
      //? get firebase data
      await getReservesHoursByReserves(
        nameParcerFunction(props.selectedBarber.name)
      );
    };

    //? Async functions promise resolve
    getReservesTimes();
  }, [reserveDate]);

  const getReservesHoursByReserves = async (barberName) => {
    try {
      //? Validate reserveTimes[] is not empty
      const resultDocs = await getQuery(barberName);

      if (resultDocs) {
      //? console.table('Response docs -> ', resultDocs);
        await filterTimesAndSetAvailables(resultDocs);
      }
    } catch (error) {
      console.error(`Error: Obteniendo las reservas -> ${error}}`);
    }
  };

  //? GET - Reserves Documents from Reserves - Firestore
  const getQuery = async (barberName) => {
    const resRef = await db
      .collection('reservas')
      .doc(nameParcerFunction(barberName))
      .collection('day_reserves');

    const result = await resRef
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .catch((err) => console.error(err));
    // console.log('Se resolvio la promesa');
    return result;
  };

  const filterTimesAndSetAvailables = (resultData: any) => {
    if (resultData) {
      //! Remove this console.log
      // console.log('Result data: ', resultData);

      //? Nueva lista con fecha formateada
      let formattedDates: { date: string; times: string[] }[] = [];

      resultData.map((item) => {
        formattedDates.push({
          date: moment(new Date(item.date).toUTCString())
            .format()
            .toString()
            .split('T')[0],
          times: item.times,
        });
      });

      // Seteamos la lista de reservas con la lista formateada.
      setReservesList(formattedDates);
      if (reserveDate) {
        // Le asignamos las horas filtradas para este dia.
        let filterHours = onSelectDate(reserveDate);
        setAvailableHours(filterHours);
      }
    }
  };

  const onSelectDate = (selectedDate: Date) => {
    let formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
    setReserveDate(selectedDate);
    setReserveHour(undefined);
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);

    //! Lista de horas ocupadas por dia.
    //? get busy hours by reserve date
    let listBusyHours = [];

    //! Por cada reserva encontrada mapeamos la lista de horas reservadas.
    reservesList.map((reserve: { date: string; times: string[] }) => {
      if (reserve.date === formatSelectedDate) {
        reserve.times.map((reserveHour: string) => {
          listBusyHours.push(reserveHour.substr(0, 5));
        });
      }
    });

    //? filter available hours by barberShop hours
    let availables = [];
    let actualHour = moment(new Date(), 'HH:mm:ss');
    let actualDate = moment(new Date()).format('YYYY-MM-DD');

    //! Lista de horas habilitadas por dia
    barberShopTime.map((barberShopHour) => {
      //? Validar si la hora habilitada esta dentro de las horas reservadas.
      //? Si esta dentro de la hora reservada y el dia seleccionado, filtramos.
      if (listBusyHours.indexOf(barberShopHour) === -1) {
        //? Validar si la fecha actual es igual a la fecha seleccionada
        if (actualDate === formatSelectedDate) {
          let formatBarberShopHour = moment(`${barberShopHour}:00`, 'HH:mm:ss');
          //? Validar si la hora habilitada es mayor o despues de la hora actual.
          if (formatBarberShopHour.isAfter(actualHour)) {
            //? Creamos la nueva lista de horas habilitadas.
            availables.push(barberShopHour);
          }
        } else {
          //? Sino esta dentro del dia actual, simplemento lo añadimos a la nueva lista de horas habilitadas de ese dia..
          availables.push(barberShopHour);
        }
      }
    });
    return availables;
  };

  const onSelectHour = (selectedHour: string) => {
    setReserveHour(selectedHour);
    props.onSelctHour(selectedHour);
  };

  return (
    <Step title='Fecha de Reservacion' subtitle='Seleccione la Fecha y Hora'>
      <div className='time-box effect-slide-top'>
        <CalendarBox value={reserveDate} onSelectDate={onSelectDate} />
        {availableHours.length ? (
          <div className='hours-box effect-slide-top'>
            <div className='container'>
              {availableHours.map((hour, i) => (
                <Button
                  className={`theme-button-outlined 
                                 hour-item 
                                ${
                                  reserveHour === hour ? 'selected-hour' : null
                                }`}
                  key={i}
                  label={hour}
                  onClick={() => {
                    onSelectHour(hour);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <Text type='text' className='no-hours'>
            No hay horarios disponibles para esta fecha
          </Text>
        )}
      </div>
    </Step>
  );
};
