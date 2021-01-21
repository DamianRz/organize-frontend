import React, { useContext, useState } from 'react';
import { DialogModal } from '../../../../dialogs/dialog-modal/dialog-modal';
import { IReserve } from '../../../../../types/Reserve.type';
import { ButtonContext } from '../../../../../contexts/ButtonsContext';
import { StepperFooter } from '../../../../containers/stepper/stepper-footer';
import { MANAGER_FIELDLS } from './manager-form';
import { FormProvider } from '../../../../../contexts/FormContext';
import { FaCalendarCheck } from 'react-icons/fa';
import { MdArrowBack, MdCheck, MdSearch } from 'react-icons/md';
import { Step } from '../../../../containers/stepper/step';
import { FormBox } from '../../../../containers/form-box';
import { Textfield } from '../../../../inputs/text-field/text-field';
import ReserveActions from '../../../../../actions/Reserve.actions';
import moment from 'moment';
import './manager-dialog.scss';
import { BarberListContext } from '../../../../../contexts/BarberListContext';
import { Button } from '../../../../inputs/button';
import { ServiceStep } from '../../../../dialogs/reserve-dialog/service-step';
import { services } from '../../../../../data/reserve';
import { IService } from '../../../../../types/Service.type';
import { Text } from '../../../../decorators/text';
import { BarberStep } from '../../../../dialogs/reserve-dialog/barber-step';
import { TimeStep } from '../../../../dialogs/reserve-dialog/time-step';

export const ManagerDialog = (props: {
  reserve: IReserve,
  onClose: any,

  //* Deprecated:
  //? onFinalized?: () => any,
  //? onCancelled?: () => any,
  onUpdated?: (updated) => any,
}) => {

  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showBarberDialog, setShowBarberDialog] = useState(false);
  const [showTimeDialog, setShowTimeDialog] = useState(false);

  const [selectedService, setSelectedService] = useState({
    name: props.reserve.workToDo,
    cost: props.reserve.totalCost
  });
  const [selectedBarber, setSelectedBarber] = useState({
    name: props.reserve.barberName,
    barberId: -1
  });

  const [reserveDate, setReserveDate] = useState(undefined)
  const [reserveHour, setReserveHour] = useState(undefined)




  // New instance actions 
  //TODO: En un futuro por mas control de instancias deberiamos de tener nuestro archivo de instancias 
  //TODO: para darle vida a una unica instancia y poder utilizarla donde sea necesario. -> Singleton Pattern
  const reserveActions: ReserveActions = new ReserveActions();

  const {
    setDisabledButton,
  } = useContext(ButtonContext);

  const {
    getBarbersList
  } = useContext(BarberListContext);

  const save = async (fields: any) => {
    setDisabledButton(true);
    let formatDateFront = moment().format('YYYY-MM-DDTHH:mm:ss');

    //* This works
    // console.log(`Estos son mis fields de reserva -> ${fields}`);
    // console.log(`Este es el cel -> ${fields[MANAGER_FIELDLS.celClient].value}`);

    let reserveUpdate: IReserve = {
      /* Check the start time: need pass the startTimeFront formatted? 
        add a callendar?
      */
      startTime: formatDateFront,
      /* Fields of form */
      workToDo: fields[MANAGER_FIELDLS.workToDo].value,
      priceWork: fields[MANAGER_FIELDLS.totalCost].value, /* <-- Are not the same but is necesary */
      celClient: fields[MANAGER_FIELDLS.celClient].value,
      /* Not updated fields (disabled or not specify) */
      reserveId: props.reserve.reserveId,
      clientId: props.reserve.clientId,
      socialNumber: props.reserve.socialNumber,
      nameClient: props.reserve.nameClient,
      barberOrHairdresserId: props.reserve.barberOrHairdresserId,
      mailClient: props.reserve.mailClient,
      additionalCost: props.reserve.additionalCost,
    }
    let response = await reserveActions.update(reserveUpdate);
    if (response) {
      console.log('Update Successfully 😎');
      // await props.onSaveRefresh()

      //! Estos metodos realmente no estaba haciendo nada, debido a que no se le envia ningun update como prop.
      props.onUpdated(reserveUpdate);
      // props.onClose();
    } else {
      console.log('Error updating:', response);
    }
    setDisabledButton(false);
  }

  const ClientForm = () => {
    return (
      <FormBox>
        <Textfield
          name={MANAGER_FIELDLS.nameClient}
          defaultvalue={props.reserve.nameClient}
          disabled={true}
          label="Nombre"
          type="text"
        />
        <Textfield
          name={MANAGER_FIELDLS.mailClient}
          defaultvalue={props.reserve.mailClient}
          disabled={true}
          label="Email"
          type="email"
        />
        <Textfield
          name={MANAGER_FIELDLS.celClient}
          defaultvalue={props.reserve.celClient}
          label="Cel"
          type="number"
        />
      </FormBox>
    )
  }

  const ServiceForm = () => {
    return (
      <>
        <div className="manager-select">
          <Text type="small">Servicio</Text>
          <Button
            style="text"
            icon={<MdSearch />}
            onClick={() => { setShowServiceDialog(true) }}
          />
        </div>
        <Text type="text" color="primary">
          {
            selectedService.name ?
              `${selectedService.name}`
              : 'Seleccione servicio'}
        </Text>
        <Text type="text" color="primary">{`Costo: $${selectedService.cost || 0}`}</Text>
      </>
    )
  }

  const getServiceByName = (nameService) => {
    console.log(nameService)
    let service = null;

    services.forEach((item: IService) => {
      if (item.name === nameService) {
        service = item;
      }
    })

    return service;
  }

  const ReserveForm = () => {
    return (
      <>
        <div className="manager-select">
          <Text type="small">Barbero</Text>
          <Button
            style="text"
            icon={<MdSearch />}
            onClick={() => { setShowBarberDialog(true) }}
          />
        </div>
        <Text type="text" color="primary">
          {
            selectedBarber.name ?
              `${selectedBarber.name}`
              : 'Seleccione barbero'}
        </Text>

        <div className="manager-select">
          <Text type="small">Fecha y hora</Text>
          <Button
            style="text"
            icon={<MdSearch />}
            onClick={() => { setShowTimeDialog(true) }}
          />
        </div>
        <Text type="text" color="primary">
          {
            reserveDate && reserveHour ?
              `${reserveDate} ${reserveHour}`
              : 'Seleccione fecha y hora'}
        </Text>
      </>
    )
  }

  return (
    <>
      <DialogModal
        title="Edición de Reserva"
        onClose={props.onClose}
        className="manager-dialog"
      >
        <FormProvider currentForm={MANAGER_FIELDLS}>
          <div className="content-manager">
            <Step subtitle="Datos del cliente">
              {ClientForm()}
            </Step>
            <div>
              <Step subtitle="Datos del servicio">
                {ServiceForm()}
              </Step>
              <Step subtitle="Datos de la reserva">
                {ReserveForm()}
              </Step>
            </div>
          </div>
          <StepperFooter
            validate={true}
            noUseWizard={true}
            prevLabel="Volver"
            nextLabel="Guardar"
            nextIcon={<FaCalendarCheck />}
            prevIcon={<MdArrowBack />}
            onNextButtonClick={(fields) => save(fields)}
            onPrevButtonClick={() => props.onClose()}
          />
        </FormProvider>
      </DialogModal>

      {
        showServiceDialog &&
        <DialogModal
          width="500px"
          height="640px"
          title="Seleccion de servicio"
          onClose={() => setShowServiceDialog(false)}
          className="manager-dialog"
        >
          <ServiceStep
            value={getServiceByName(props.reserve.workToDo)}
            services={services}
            setService={(res) => {
              setSelectedService(res);
              setShowServiceDialog(false)
            }} />
        </DialogModal>
      }
      {
        showBarberDialog &&
        <DialogModal
          width="500px"
          height="640px"
          title="Seleccion de barbero"
          onClose={() => setShowBarberDialog(false)}
          className="manager-dialog"
        >
          <BarberStep
            value={setSelectedBarber}
            setBarber={(res) => {
              setSelectedBarber(res);
              setShowBarberDialog(false);
            }}
          />

        </DialogModal>
      }
      {
        showTimeDialog &&
        <DialogModal
          width="500px"
          height="640px"
          title="Seleccion de fecha y hora"
          onClose={() => setShowTimeDialog(false)}
          className="manager-dialog"
        >
          <TimeStep
            reserveDate={reserveDate}
            reserveHour={reserveHour}
            barberId={selectedBarber.barberId || -1}
            selectedBarber={selectedBarber || {}}
            onSelctDate={(res) => setReserveDate(moment(res).format('DD/MM/YYYY'))}
            onSelctHour={setReserveHour}
          />

        </DialogModal>
      }
    </>
  )
}
