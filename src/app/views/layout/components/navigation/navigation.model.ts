/**
 * Created by Anthony on 02/09/2019.
 */

export class Menu {
  public heading: boolean;
  public title: string;
  public icon: string;
  public url: string;
  public translate: string;
  public children: Child[];
  public permission: string[];
}

 interface Child {
   title: string;
   url: string;
   permission: string[];
}
