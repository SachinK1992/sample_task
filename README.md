# README

## Setup
  Run the following commands

 - `bundle`
 - `yarn install` - make sure you are using node version v16.x
 - `rails db:setup`

## Running Project

  Run the follwing commands in separate terminal

  - `rails s`
  - `bin/webpack-dev-server`

  Open [localhost:3000](http://localhost:3000)

## Explaination

  We have build an application on react which is tighly coupled with backend(rails)
  In React we have used backend GraphQl Api to fetch and update data

## You must implement the following points :
 - The user must be able to create a new accounting transaction and to see all the existing ones - **Completed**
 - At any time, we should be able to know what is the current balance of any account - **Completed**

## Characteristics of an accounting transaction :
 - Debit Account
 - Credit Account
 - Date
 - Amount

## Technical constraints :
 - It has been decided to go for a GraphQL API - **Integrated GraphQl APIs**
 - Use RoR as framework - **Used RoR as Backend Framework**
 - A frontend (ideally in React) is required but it doesn’t need to be good looking, it can ugly as long as it works ! - **Used React as frontend framework**
 - Keep best development practices in mind - **Followed best development practices**
