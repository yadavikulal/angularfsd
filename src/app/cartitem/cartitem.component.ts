import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
  cid: any
  pid: any
  List: any
  List2: any
  List3: any
  List4 = [];
  List5 = [];
  List6 = [];
  address: any;
  amount: any;
  data: number;
  plusval: any;
  quantity: any;
  url: string;
  period: any;
  plusval2: any;
  productname: any;
  finalAmount: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.quantity = 1;
    this.period = 1;
    this.cid = localStorage.getItem('id');

    let url3 = "http://b8java18.iiht.tech:3000/viewcart/" + this.cid;

    fetch(url3, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        this.List = data;
        console.log(this.List);
        setTimeout(function () {
          var sum = 0;
          for (let i of data) {
            let id = "subtotal" + i.productid;
            console.log(id);
            var p = +(<HTMLInputElement>document.getElementById(id)).innerText;
            sum = sum + p;
            (<HTMLOutputElement>document.getElementById('amount')).innerHTML = String(sum);
            this.finalAmount=sum+50;
            (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML = String(this.finalAmount);
            localStorage.setItem('finalAmount',this.finalAmount)
          }

        }, 1000)


      })

    let url4 = `http://b8java18.iiht.tech:3000/findcustomerid/` + this.cid;
    fetch(url4, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.address = data[0].customeraddress;
      })

    //let url5=`http://b8java18.iiht.tech:3000/showproductbyid/p1`;

    this.List3 = JSON.parse(localStorage.getItem('products'));
    console.log(this.List3);
    for (var i of this.List3) {

      this.pid = i.productId;
      this.List5.push(this.pid);
      console.log(this.List5);
    }

    ///////////////////////


    for (var i of this.List5) {
      console.log(i);
      let url5 = `http://b8java18.iiht.tech:3000/showproductbyid/` + i
      fetch(url5, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      }).then(res => res.json())
        .then(data => {
          //console.log(data);
          this.List2 = data;
          console.log(this.List2);

          this.List4.push(this.List2);
          console.log(this.List4);
        })
        
    }
    this.List6=this.List4;
    console.log(this.List6);


  }





  plus(id: any) {
    console.log(id);
    let elementid = "input" + id;
    console.log(elementid);
    this.plusval = +((<HTMLInputElement>document.getElementById(elementid)).value);
    console.log(this.plusval);
    var price = "price" + id;
    var subtotal = +((<HTMLInputElement>document.getElementById(price)).innerHTML);
    this.quantity = this.plusval + 1;
    (<HTMLOutputElement>document.getElementById(elementid)).value = String(this.quantity);
    console.log(subtotal * this.quantity * this.period);
    let subtot = "subtotal" + id;
    (<HTMLOutputElement>document.getElementById(subtot)).innerHTML = String(this.quantity * subtotal * this.period);
    var sum = 0;
    for (let i of this.List) {
      let id = "subtotal" + i.productid;
      console.log(id);
      var p = +(<HTMLInputElement>document.getElementById(id)).innerText;
      sum = sum + p;
    }
    (<HTMLOutputElement>document.getElementById('amount')).innerHTML = String(sum);
    (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML = String(sum + 50);
  }

  minus(id: any) {
    console.log(id);
    let elementid = "input" + id;
    this.plusval = +((<HTMLInputElement>document.getElementById(elementid)).value);
    var price = "price" + id;
    var subtotal = +((<HTMLInputElement>document.getElementById(price)).innerHTML);
    if (this.plusval > 1) {
      this.quantity = this.plusval - 1;
      (<HTMLOutputElement>document.getElementById(elementid)).value = String(this.quantity);
      console.log(subtotal * this.quantity * this.period);
      let subtot = "subtotal" + id;
      (<HTMLOutputElement>document.getElementById(subtot)).innerHTML = String(this.quantity * subtotal * this.period);
      var sum = 0;
      for (let i of this.List) {
        let id = "subtotal" + i.productid;
        console.log(id);
        var p = +(<HTMLInputElement>document.getElementById(id)).innerText;
        sum = sum + p;
      }
      (<HTMLOutputElement>document.getElementById('amount')).innerHTML = String(sum);
      (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML = String(sum + 50);
    }

  }

  deleteitem(pid: any) {
    let url = "http://b8java18.iiht.tech:3000/deleteitem/" + pid + "/" + this.cid;
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    window.location.reload();
  }

  addmore() {
    console.log("addmore");
    let city = localStorage.getItem('city');
    this.router.navigate(['homepage/' + city]);
  }

  checkout() {
    let status: any
    for (let i of this.List) {
      let productid = i.productid;
      let quantid = "input" + i.productid;
      let quantity = +(<HTMLOutputElement>document.getElementById(quantid)).value;
      console.log(quantity + " " + productid);
      let url = "http://b8java18.iiht.tech:3000/savecart/" + this.cid + "/" + productid + "/" + quantity;
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      }).then(res => res.text()).then(data => {
        console.log(data);
        if (data == "unsuccessfull") {
          status = "unsuccessfull";
        };
      })

    }

    setTimeout(() => {
      console.log(status);
      if (status == "unsuccessfull") {
        alert("Not enough quantity in stock. Reduce the quantity");
      }
      else {
        let finalamount = (<HTMLOutputElement>document.getElementById('finalamount')).innerText;
        localStorage.setItem('amount', finalamount);
        this.router.navigate(['cartverify']);
      }
    }, 1000)


  }


  timeplus(id: any) {

    console.log(id);
    let elementid = "period" + id;
    console.log(elementid);
    this.plusval2 = +((<HTMLInputElement>document.getElementById(elementid)).value);
    console.log(this.quantity + " " + this.plusval2);
    var price = "price" + id;
    var subtotal = +((<HTMLInputElement>document.getElementById(price)).innerHTML);

    if (this.plusval2 <= 6) {
      this.period = this.plusval2 + 1;
      (<HTMLOutputElement>document.getElementById(elementid)).value = String(this.period);
      console.log(subtotal + " " + this.quantity + " " + this.period);
      let subtot = "subtotal" + id;
      (<HTMLOutputElement>document.getElementById(subtot)).innerHTML = String(this.quantity * subtotal * this.period);
      var sum = 0;
      for (let i of this.List) {
        let id = "subtotal" + i.productid;
        console.log(id);
        var p = +(<HTMLInputElement>document.getElementById(id)).innerText;
        sum = sum + p;
      }
      (<HTMLOutputElement>document.getElementById('amount')).innerHTML = String(sum);
      (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML = String(sum + 50);
    }
  }


  timeminus(id: any) {
    console.log(id);
    let elementid = "period" + id;
    this.plusval2 = +((<HTMLInputElement>document.getElementById(elementid)).value);
    var price = "price" + id;
    var subtotal = +((<HTMLInputElement>document.getElementById(price)).innerHTML);
    if (this.plusval2 > 1) {
      this.period = this.plusval2 - 1;
      (<HTMLOutputElement>document.getElementById(elementid)).value = String(this.period);
      console.log(subtotal * this.quantity * this.period);
      let subtot = "subtotal" + id;
      (<HTMLOutputElement>document.getElementById(subtot)).innerHTML = String(this.quantity * subtotal * this.period);
      var sum = 0;
      for (let i of this.List) {
        let id = "subtotal" + i.productid;
        console.log(id);
        var p = +(<HTMLInputElement>document.getElementById(id)).innerText;
        sum = sum + p;
      }
      (<HTMLOutputElement>document.getElementById('amount')).innerHTML = String(sum);
      (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML = String(sum + 50);
    }
  }

}
