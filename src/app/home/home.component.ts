import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/items.service';
import { WidgetsService } from '../shared/widgets.service';
import { Item } from '../shared/item.model';
import { Widget } from '../shared/widget.model';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const WidgetsQuery = gql`
  query allWidgets {
    allWidgets {
      id
      name
      description
    }
  }
`;

interface QueryResponse {
  allWidgets
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  items: Item[];
  widgets: Widget[];

  constructor(private itemsService: ItemsService,
              private widgetsService: WidgetsService,
              private apollo: Apollo) {
  }

  ngOnInit() {
    this.getItems();
    this.getWidgets();
  }

  getItems() {
    // this.itemsService.all()
    //   .subscribe(items => this.items = items);

    this.apollo.watchQuery<QueryResponse>({
      query: WidgetsQuery
    })
      .subscribe(({data}) => {
        this.items = data.allWidgets;
      });
  }

  getWidgets() {
    this.widgetsService.all()
      .subscribe(widgets => this.widgets = widgets);
  }

  handleResults(items) {
    this.items = items;
  }
}
