import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'order-history',
  imports: [NgFor, NgIf],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];
  userId!: string;
  itemsPerPage: number = 10;

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  async ngOnInit() {

    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.userId = idParam;
        await this.getallOrdersByUserId(this.userId);
      } else {
        console.error('Artwork ID not provided in route parameters.');
      }
    });
  }

  async getallOrdersByUserId(userId: string) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.ordersService.getAllOrdersByUserId(userId);
      if (Succeeded) {
        this.orders = Data;
        return Data;
      }
      else {
        this.toastrService.error(ErrorMessage);
      } 
    } catch (error) {
      console.error(error);
    }
  }
}
