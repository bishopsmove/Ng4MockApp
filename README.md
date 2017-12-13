# Ng4MockApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

Built via Yarn.
Styling is implemented via **Material Design Lite**.
Other node_modules can be imported, as needed.

## Description

This application manages office locations and personnel for a fictitious company.

It is comprised of four basic parts:

1. Dashboard
2. Personnel List
3. Office List
4. Common Service

### Dashboard

The Dashboard should display the Personnel List. There should also be a means for accessing the Office List. This is the default route for the application and there is always a link/button displayed that allows a user to return to the Dashboard.

### Personnel List

The Personnel List displays the Personnel Card component in a columnar format and be sortable by Last Name (A-Z), Office Location Name (A-Z), or Hire Date (descending). There needs to be a button for creating a new Personnel entry.

### Personnel Card

The Personnel Card component manages the create, edit and display workflows of Personnel, utilizing the Person model. When rendering the Display workflow, there must be a link that switches the rendering into the Edit workflow.

In the Edit workflow, standard field validations apply (i.e. Date fields are valid dates & date ranges - BirthDate\HireDate is not after today's date. HireDate is not before BirthDate and neither date is more than 100 years ago.)

Finally, the Office Location of a Person might not be determined yet.

### Office List

This component renders a standard table of entries for Office Locations, based on the Office model.

### Common Service

For the sake of brevity, all application state initializations and changes are to be managed by the Common Service. 

There are supporting data files for this application that are accessible via the Common Service, located in the src/assets/data folder. These are used to initialize the relevant components.

Once you have addressed each task below, test the result.

## Exercise Tasks

The Office List needs to update an entry via the Common Service.

The Office List needs the ability to create new Office Locations.

Both Person and Office models need to account for PhoneNumbers and reflect them in corresponding components.

Personnel needs to account for Role. There will be two Roles: Manager & Staff. Personnel can only have one Role.

Office Location needs to account for a Manager. In the Edit workflow, the Manager field should be a dropdown of only Personnel with a Manager Role. A Manager  can be a Manager of more than one Office Location.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
