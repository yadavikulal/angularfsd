import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-paymentpay',
  templateUrl: './paymentpay.component.html',
  styleUrls: ['./paymentpay.component.css']
})
export class PaymentpayComponent implements OnInit {

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  finalAmount: any;
  cid: string;
  url: string;

  constructor(private http: HttpClient) { }

  confirmPayment() {

    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount
    }
    return this.http.post<any>('http://localhost:1234/payment/payment-details', paymentPayload).subscribe(
      data => {
        console.log(data);
        this.payuform.txnid = data.txnId;
        this.payuform.surl = data.sUrl;
        this.payuform.furl = data.fUrl;
        this.payuform.key = data.key;
        this.payuform.hash = data.hash;
        this.payuform.txnid = data.txnId;
        this.disablePaymentButton = false;
        localStorage.removeItem('products')
        localStorage.removeItem('finalAmount')
      },
      error1 => {
        console.log(error1);
      })
  }

  placeOrder() {
    return this.http.get('http://b8java18.iiht.tech:3000/checkout/success/'+this.cid).subscribe(
      data => {
        console.log("cart deleted!")
      })
  }

  ngOnInit() {

    this.finalAmount = localStorage.getItem('finalAmount');
    console.log(this.finalAmount);
    (<HTMLOutputElement>document.getElementById("amount")).value = this.finalAmount;
    this.payuform.amount = this.finalAmount;

    this.cid = localStorage.getItem('id');
    this.url = `http://b8java18.iiht.tech:3000/findcustomerid/`+this.cid;
    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        (<HTMLOutputElement>document.getElementById('firstname')).value = data[0].customeraddress;
        this.payuform.firstname = data[0].customeraddress;
        (<HTMLOutputElement>document.getElementById('productInfo')).value = data[0].customername;
        this.payuform.productinfo = data[0].customername;
        (<HTMLOutputElement>document.getElementById('email')).value = data[0].customeremail;
        this.payuform.email = data[0].customeremail;
        (<HTMLOutputElement>document.getElementById('phone')).value = data[0].customercontact;
        this.payuform.phone = data[0].customercontact;
      })

  }

}