import React, { useContext, useEffect, useState } from 'react';
import ReserveActions from '../../../../actions/Reserve.actions';
import { ButtonContext } from '../../../../contexts/ButtonsContext';
import { CustomTable } from '../../../custom-table/custom-table';
import { headerMobileOrder, headerOrder } from '../../../../data/dashboard';
import { IReserve } from '../../../../types/Reserve.type';
import { ManagerDialog } from './manager-dialog';
import { ManagerActions } from './manager-actions';
import { ConfirmDialog } from '../../../dialogs/confirm-dialog';
import moment from 'moment';
import './reserve-manager.scss';
import { removeWorkDayFromBarberCalendar } from '../../../dialogs/reserve-dialog/firebaseQueries';

export const ReserveManager = () => {
  const reserveActions: ReserveActions = new ReserveActions();
  const [reserves, setReserves] = useState([]);
  const [selectedReserve, setSelectedReserve] = useState(undefined);
  const [showManagerDialog, setShowManagerDialog] = useState(false);
  const [showFinalizeDialog, setFinalizeDialog] = useState(false);
  const [showCancelDialog, setCancelDialog] = useState(false);
  const [reserveUpdated, setReserveUpdated] = useState(false);

  useEffect(
    () => {
      const fetchGetReserves = async () => {
        await getReserves();
      };
      /* check user is admin
    // !userIsAdmin() ? (document.location.href = "/") : (
        */
      fetchGetReserves();
    },
    [
      /*reserveUpdated*/
    ]
  );

  useEffect(() => {
    console.log('refresh table');
    reserveUpdated ? setReserveUpdated(false) : null;
  }, [reserveUpdated]);

  // Mobile headers
  const mobileHeaders = headerMobileOrder;

  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);

  const getReserves = async () => {
    setDisabledButton(true);
    const reserves: any[] = await reserveActions.getAll();
    if (reserves) {
      /* formatting date */
      reserves.map((reserve: IReserve) => {
        reserve.startTimeFront = moment(reserve.startTime)
          .format('DD/MM/YYYY hh:mm:ss')
          .substr(0, 16);
      });
      setReserves(reserves);
    }
    setDisabledButton(false);
  };

  const showEditReserve = (reserve: any) => {
    setSelectedReserve(reserve);
    setShowManagerDialog(true);
  };

  const removeSelectedReserve = () => {
    let removeReserve = reserves.splice(reserves.indexOf(selectedReserve), 1);
    setReserves(removeReserve);
    setSelectedReserve(null);
  };

  /* FINALIZE RESERVE */
  const finalize = async () => {
    setDisabledButton(true);
    let response = await reserveActions.doneReserve(
      selectedReserve.barberOrHairdresserId,
      selectedReserve.reserveId
    );
    if (response) {
      removeSelectedReserve();
      setFinalizeDialog(false);
    } else {
      console.log('error', response);
    }
    setDisabledButton(false);
  };

  /* CANCEL RESERVE */
  const cancel = async () => {
    setDisabledButton(true);
    let response = await reserveActions.cancel(
      selectedReserve.clientId,
      selectedReserve.reserveId
    );
    if (response) {
      removeSelectedReserve();
      setCancelDialog(false);
    } else {
      console.log('error cancel :', response);
    }
    setDisabledButton(false);
  };

  /* REFRESH TABLE METHOD */
  const isUpdated = (reserve) => {
    console.log(`Id reserva -> ${JSON.stringify(reserve.reserveId)}`);
    console.log(
      `CelClient modificado reserva -> ${JSON.stringify(reserve.celClient)}`
    );
    const temp = [];

    reserves.map((item) => {
      if (item.reserveId === reserve.reserveId) {
        console.log(`pushing to temp new reserve -> ${reserve.reserveId}`);
        temp.push(reserve);
        reserves.pop();
      } else {
        console.log(`pushing to temp item -> ${item.reserveId}`);
        temp.push(item);
        reserves.pop();
      }
    });
    setReserves([]);
    console.log(`Clean -> ${JSON.stringify(reserves)}`);

    setReserves(temp);
    setReserveUpdated(true);
    console.log(`Mis nuevas reservas -> ${JSON.stringify(reserves)}`);
  };

  // Este metodo es para probar y no repetir el codigo de la tabla, se que se puede hacer el render condicional de mejor forma
  // Pero de una u otra manera no me estuvo funcando bro.
  const showTable = () => {
    return (
      <CustomTable
        items={reserves}
        headers={headerOrder}
        onSelectRow={(reserve) => {
          setSelectedReserve(reserve);
        }}
        onEditItem={(reserve) => {
          showEditReserve(reserve);
        }}
        sortColumnByHeader={{
          headerToAction: 'startTimeFront',
          headerToSort: 'reserveId',
        }}
        footerItems={[]}
      />
    );
  };

  const forHollidaysReservesDate = async () => {
    let arrayDates = [
      '2021-01-06',
      '2021-01-07',
      '2021-01-08',
      '2021-01-09',
      '2021-01-10',
      '2021-01-11',
      '2021-01-12',
      '2021-01-13',
      '2021-01-14',
      '2021-01-15',
    ];

    //* Ejemplos de datos que se precisan
    // let date = '2021-01-05';
    // let name = 'pablo mernis';
    
    arrayDates.forEach(date => {
      //* Solo por las dudas seteo las vars en  ' ' solo por prevencion.
      date = '';
      let name = '';
      let response: any = removeWorkDayFromBarberCalendar(date, name);
      console.log('response is -> ', response);
  
      if (response.code === 200) {
        console.log('Se Reservo todo el dia', response.message);
      } else {
        console.log('Algo salio mal: ', response.message);
      }
    })
    
  };

  return (
    <>
      {
        /** Rancio pero la movida era para que funque, una vez de con que es lo que no deja hacer el render lo aprolijo. */
        //reserveUpdated ? showTable() : showTable()
        showTable()
      }
      {selectedReserve && (
        <ManagerActions
          header={headerOrder[0]} //! TODO: -> Estamos quemando el valor de ordenamiento que le indicamos? (1 - fecha, 2 - ID )
          item={selectedReserve}
          onFinalize={() => setFinalizeDialog(true)}
          onCancelled={() => setCancelDialog(true)}

          //* Anulamos los dias que necesitemos.
          onReserveAllDay={() => forHollidaysReservesDate()}
        />
      )}
            {showFinalizeDialog && (
                <ConfirmDialog
                    title="Finalizacion de reserva"
                    message="Esta seguro de que desea finalizar la reserva?"
                    acceptLabel="Confirmar Accion"
                    cancelLabel="Volver"
                    onAccept={() => finalize()}
                    onCancel={() => setFinalizeDialog(false)}
                />
            )}

      {showManagerDialog && (
        <ManagerDialog
          reserve={selectedReserve}
          onClose={() => setShowManagerDialog(false)}
          onUpdated={(reserve) => isUpdated(reserve)}

          //* Deprecated..
          //? onSaveRefresh={() => isUpdated()}
          //? onFinalized={() => { }}
          //? onCancelled={() => { }}
        />
      )}

      {showFinalizeDialog && (
        <ConfirmDialog
          title='Finalizacion de reserva'
          message='Esta seguro de que desea finalizar la reserva?'
          acceptLabel='Confirmar Accion'
          cancelLabel='Volver'
          onAccept={() => finalize()}
          onCancel={() => setFinalizeDialog(false)}
        />
      )}

      {showCancelDialog && (
        <ConfirmDialog
          title='Cancelacion de reserva'
          message='Esta seguro de que desea cancelar la reserva?'
          acceptLabel='Confirmar Accion'
          cancelLabel='Volver'
          onAccept={() => cancel()}
          onCancel={() => setCancelDialog(false)}
        />
      )}
    </>
  );
};
