import { Component } from '@angular/core';
import { getDataOrderDynamic } from './models/util';
import { IzipayServiceService } from 'src/app/services/izipay-service.service';
declare const Izipay: any;
@Component({
  selector: 'app-izipay',
  templateUrl: './izipay.component.html',
  styleUrls: ['./izipay.component.scss']
})
export class IzipayComponent {
  Transaction: any;
  info_token : any;

  constructor(
    private izipayService: IzipayServiceService
  ) {

  }
  ngOnInit() {
    this.getDataOrderDynamic();
    this.getTokenSession()

  }
  getDataOrderDynamic() {
    const currentTimeUnix = Math.floor(Date.now()) * 1000;
    const transactionId = currentTimeUnix.toString().slice(0, 14);
    const orderNumber = currentTimeUnix.toString().slice(0, 10);

    this.Transaction = {
      currentTimeUnix: currentTimeUnix,
      transactionId: transactionId,
      orderNumber: orderNumber,
    }
    console.log("Data transaccion: ", this.Transaction);

  }

  getTokenSession() {
    const idTransacion = this.Transaction.transactionId
    const data = {
      datosReserva: {
        idhorario: "2",
        fechacita: "2023-07-25T21:45:00.000+00:00",
        duracionpromedio: 15,
        duracionreal: 15,
        idpaciente: 2219324,
        idmedico: 1580012,
        idespecialidad: 23,
        email: "YEISONAMADO811@GMAIL.COM",
        pertipoparentesco: "2219324"
      },
      currency: 'PEN',
      amount: '1.99'

    }

    this.izipayService.getTokenSession(idTransacion, data).subscribe(
      data => {
        console.log("data", data);
        this.info_token = data;
      }
    )
  }

  pay() {
    const PUBLIC_KEY = 'VErethUtraQuxas57wuMuquprADrAHAb';
    const TRANSACTION_ID = this.info_token.orderNumber;
    const ORDER_NUMBER = this.info_token.orderNumber;
    //const MERCHANT_CODE = '4001834';
    const MERCHANT_CODE = '4004345';
    
    const ORDER_CURRENCY = 'PEN';
    const ORDER_AMOUNT = '1.99';
    const iziConfig = {
      publicKey: PUBLIC_KEY,
      config: {
        transactionId: TRANSACTION_ID,
        action: 'pay',
        merchantCode: MERCHANT_CODE,
        order: {
          orderNumber: ORDER_NUMBER,
          currency: ORDER_CURRENCY,
          amount: ORDER_AMOUNT,
          processType: 'AT',
          merchantBuyerId: 'mc1768',
          dateTimeTransaction: '1670258741603000', //currentTimeUnix
        },
        card: {
          brand: '',
          pan: '',
        },
        billing: {
          firstName: 'Darwin',
          lastName: 'Paniagua',
          email: 'demo@izipay.pe',
          phoneNumber: '989339999',
          street: 'calle el demo',
          city: 'lima',
          state: 'lima',
          country: 'PE',
          postalCode: '00001',
          document: '12345678',
          documentType: 'DNI',
        },
        render: {
          typeForm: 'pop-up',
          container: '#your-iframe-payment',
        },
        urlRedirect: 'http://rsdev.site/im-web-frontend/#/mis-citas/pagadas',
        appearance: {
          logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
        },
      },
    };
    
   
    this.handleLoadForm(this.info_token.token , iziConfig)

  }

  handleLoadForm(token : any , iziConfig : any) {
    console.log("token" , token);
    
    try {
      const izi = new Izipay({
        publicKey: iziConfig?.publicKey,
        config: iziConfig?.config
      });

      izi &&
      izi.LoadForm({
        authorization: token,
        keyRSA: 'RSA',
        callbackResponse: this.callbackResponsePayment
      });

    } catch (error) {
      console.log(error);
    }
  }

  callbackResponsePayment(response: any) {
    document.querySelector('#payment-message')!.innerHTML = JSON.stringify(response, null, 2);
  }
}
