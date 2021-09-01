<h1 align="center">PetPaws</h1>

<p align="center">
  <a href="http://www.pet-paws.ca/" target="_blank">
    <img width="25%" alt="logo" src="https://user-images.githubusercontent.com/50537610/131701421-8101847b-0106-4eb4-be09-6a07b36fd515.png">
   </a>
</p>

<p align="center">
  <a href="http://www.pet-paws.ca/" target="_blank">PetPaws</a> is a web platform to help pet parents manage their pets’ health
</p>

<br>

<p align="center">
  <img width="32.5%" alt="calculator" src="https://user-images.githubusercontent.com/50537610/131706447-e77d1f18-2323-4d0b-b326-31ba68b2644c.png"> <img width="32.5%" alt="finder" src="https://user-images.githubusercontent.com/50537610/131706437-762b1dc4-853c-43ee-823c-b9091becb35b.png"> <img width="32.5%" alt="meal tracker" src="https://user-images.githubusercontent.com/50537610/131707442-6a7eb055-541a-4773-92d0-8b600241d3dc.png">
</p>

## Problem to Tackle

Pets are now considered as family members, and they are entitled to the same level of respect as any other member of the family.
Pet health issues are a major concern for those families, but it can be tough to give them the right amount of calories, or to compare veterinarians and pet stores to discover the best option for them.

## Our Solution: PetPaws

PetPaws has 3 main features:

1. Search for veterinarians and pet stores
2. Track daily meals and walks
3. Calculate ideal calorie intake per day

## System Architecture

![system-architecture](https://user-images.githubusercontent.com/50537610/131701688-42e01050-a561-47d2-bb4d-5817d4d4ca10.png)

### Frontend
Developed using React, styled using Sass, and hosted in S3.

### Backend
Developed using node.js and express, and hosted in Heroku.
MySQL is used as a main database storing pet profiles, daily tracking records, and veterinarians and pet stores information.
Firebase Storage is used to store pet images uploaded by users.

## API Reference

1. The Dog API https://thedogapi.com/
2. The Cat API https://thecatapi.com/

## License

The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.
