import { Component, OnInit } from '@angular/core';
import { IproductDto } from 'src/app/products/Models/iproduct-dto';
import { IOrder } from '../../Models/iorder';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentCulture: string;
  Address : string ;
  items : IproductDto[] =[];
  OrderListlength:number=0;
  ordersList:IOrder[]=[]
  customerId:string;
  pending:boolean=false;
  delivered :boolean=false;
  pendingOrderList:IOrder[]=[];
  pendingListlength:number=0;
  deliveredOrderList:IOrder[]=[];
  DeliveredListlength:number=0;
productrate!:number[][];
  constructor(    private route: Router,
    private cookieService: CookieService,
    private orderSer: OrderService,
    private OrderSer :OrderService,
    private translate: TranslateService ) {
    this.Address = this.cookieService.get('UserAddress');
    this.customerId=this.cookieService.get('UserId');
    this.currentCulture = 'en';
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    var idIndex=document.cookie.indexOf("UserId")
    if (idIndex===-1) {
      this.route.navigate(['LogIn']);
    }

    // this.items = this.OrderService.getItems();
    //get User orders
  this.orderSer.GetAllByUserId(this.customerId).subscribe((orders)=>{
    this.ordersList = orders;


   // get pending orders
    this.pendingOrderList=this.ordersList.filter((order)=>order.orderStatus==="Pending")
this.pendingListlength=this.pendingOrderList.length;


    //get Delivered orders
    this.deliveredOrderList=this.ordersList.filter((order)=>order.orderStatus=="Delivered")
    this.DeliveredListlength=this.deliveredOrderList.length

     this.OrderListlength=this.ordersList.length;

    //get Product rate in deliverd order list
    this.productrate=[];
      // for (const ordI in this.deliveredOrderList) {
      //   this.productrate[ordI]=[];
      //   for (const prdI in this.deliveredOrderList[ordI].productList) {
      //     this.orderSer
      //     .getRate(this.deliveredOrderList[ordI].id,
      //       this.deliveredOrderList[ordI].productList[prdI].id)
      //     .subscribe(rate =>this.productrate[ordI][prdI]=rate)

      //   }
      // }

  });


}



  deleteOrder(pendingorderId:number) {
    // var orderId = this.cookieService.get('orderId');
    // this.orderSer.delete(+orderId).subscribe(() => {});
    // localStorage.removeItem('orderItems');
    // this.route.navigate(['Home']);
    this.orderSer.DeleteOrder(pendingorderId).subscribe(() => {  location.reload(); });

    }
    UpdateOrder(orderId:number){
      // this.route.navigate(['update',orderId])
      // console.log(orderId);

    }
    SetRatingValue(orderId:number,prdId:number,ordI:number,prdI:number){
    // // console.log(orderId,prdId,this.productrate[ordI][prdI]);
    // let rate = this.productrate[ordI][prdI]
    // this.orderSer.setRate(orderId,prdId,rate).subscribe();

    }
}
