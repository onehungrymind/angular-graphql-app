import { Component, OnInit } from '@angular/core';
import { ItemsService, Item } from '../shared';
import { NotificationsService } from '../shared/notifications.service';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ItemsQuery = gql`
  query allItems {
    allItems {
      id
      name
      description
    }
  }
`;

interface QueryResponse {
  allItems
}


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  currentItem: Item;

  constructor(private apollo: Apollo,
              private itemsService: ItemsService,
              private ns: NotificationsService) {
  }

  ngOnInit() {
    this.getItems();
    this.resetCurrentItem();
  }

  resetCurrentItem() {
    this.currentItem = {id: null, name: '', description: ''};
  }

  selectItem(item) {
    this.currentItem = item;
  }

  cancel(item) {
    this.resetCurrentItem();
  }

  getItems() {
    // this.itemsService.all()
    // .subscribe(items => this.items = items);

    this.apollo.watchQuery<QueryResponse>({
        query: ItemsQuery
      })
      .subscribe(({data}) => {
        this.items = data.allItems;
      });
  }

  saveItem(item) {
    if (!item.id) {
      this.createItem(item);
    } else {
      this.updateItem(item);
    }
  }

  createItem(item) {
    this.apollo.mutate({
        mutation: gql`
          mutation($name: String!, $description: String!) {
            createItem (
              name: $name
              description: $description
          ) {
              id
              name
              description
            }
          }
        `,
        variables: {
          id: item.id,
          name: item.name,
          description: item.description
        }
      })
      .subscribe(response => {
        this.ns.emit('Item created!');
        this.getItems();
        this.resetCurrentItem();
      });

    /*
    this.itemsService.create(item)
      .subscribe(response => {
        this.ns.emit('Item created!');
        this.getItems();
        this.resetCurrentItem();
      });
      */
  }

  updateItem(item) {
    this.apollo.mutate({
        mutation: gql`
          mutation($id:ID!, $name: String!, $description:String!) {
            updateItem (
              id: $id
              name: $name
              description: $description
            ) {
              id
              name
              description
            }
          }
        `,
        variables: {
          id: item.id,
          name: item.name,
          description: item.description
        }
      })
      .subscribe(response => {
        this.ns.emit('Item saved!');
        this.getItems();
        this.resetCurrentItem();
      });


    /*
    this.itemsService.update(item)
      .subscribe(response => {
        this.ns.emit('Item saved!');
        this.getItems();
        this.resetCurrentItem();
      });
      */
  }

  deleteItem(item) {
    this.apollo.mutate({
        mutation: gql`
          mutation($id:ID!) {
            deleteItem (
              id: $id
            ) {
              id
              name
              description
            }
          }
        `,
        variables: {
          id: item.id,
          name: item.name,
          description: item.description
        }
      })
      .subscribe(response => {
        this.ns.emit('Item deleted!');
        this.getItems();
        this.resetCurrentItem();
      });

    /*
    this.itemsService.delete(item)
      .subscribe(response => {
        this.ns.emit('Item deleted!');
        this.getItems();
        this.resetCurrentItem();
      });
    */
  }
}
