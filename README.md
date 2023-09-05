# BookMarked (Client-side)

BookMarked is a web application that allows users access to a virtual 'library' where they can add books that they have read or are interested in reading. They can also review these books.

## About the User
BookMarked is an application that allows users to keep track of books that they have read, are currently reading, or would like to read. It also allows users to review books that they have in their library. Users can follow one another, and see on their homepage feed when another user reviews a book.

## Features
- BookMarked uses Google authentication to log in, and then allows users to create a BookMarked account that is accessed with their Google account.
- Users can update their account/profile information.
- Users can add (create) books to their library.  If needed, they can edit (update) the book’s information, or delete the book altogether. When they look (read) at their library page, they will see all of the books that they have added.
- Books will have 4 statuses: Read, Currently Reading, Want to Read, or Did Not Finish. Users can update these statuses on their books.
- Users can review the books that they have in their library.
- Users can view their own profile or another user’s profile. On the user's profile, they will see a list of books that they have marked as 'favorites.' On other users’ profiles, they will see any reviews that user has posted.
- Users can follow one another.  Users’ home pages will display a feed of reviews left by users they follow.

## Project Screenshots
TBA

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [ERD](https://drawsql.app/teams/whitleys-team/diagrams/bookmarked)
- [Wireframes](https://www.figma.com/file/WuiekUg5rbdtsYhlfQXcjH/BookMarked-Wireframe?type=design&node-id=0%3A1&mode=design&t=mJc1opQkT92X8dUN-1)
- [Project Board](https://github.com/users/WhitleyBeers/projects/3/views/1)
- [Server-side Repo](https://github.com/WhitleyBeers/BookMarked-Server)

## Get Started
### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="915" alt="Screen Shot 2022-07-06 at 12 54 01 PM" src="https://user-images.githubusercontent.com/29741570/177612998-4aac9237-5a1e-4f13-8ae0-468587521564.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="763" alt="Screen Shot 2022-07-06 at 12 54 48 PM" src="https://user-images.githubusercontent.com/29741570/177613126-dd38f678-7553-4f27-8a4a-75680f14d71e.png">

#### 3. Clone your new repo to your local machine
#### 4. Go to the **NEXT** section

## Starting the Project
1. Create a Firebase project and set up authentication.
2. Create a `.env` file at the root of the project
3. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
4. Copy over all of your Firebase values into the `.env` file.
5. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
6. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
7. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
8. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
9. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">

## Code Snippet
TBA

## Tech Stack
<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="50px" height="50px"></a>
<a href="https://react-bootstrap.github.io/" title="React Bootstrap"><img src="https://user-images.githubusercontent.com/112125700/226490565-5b0088db-60eb-4389-9287-83eaa34f33e8.png" alt="React Bootstrap" width="50px" height="50px"></a>
<img src="https://user-images.githubusercontent.com/112125700/226491169-7d7e44df-908f-4ddd-89c2-23d1f53a54ba.png" alt="Javascript" width="50px" height="50px">
<a href="https://firebase.google.com/" title="Firebase"><img src="https://user-images.githubusercontent.com/112125700/226491361-68248e47-9434-430a-b2c1-c8866fd1c090.png" alt="Firebase" width="50px" height="50px"></a>
<a href="https://nextjs.org/" title="Next.js"><img src="https://user-images.githubusercontent.com/112125700/226491454-44e269a0-4d80-4ff7-b27a-111ab656f39b.png" alt="Next.js" width="50px" height="50px"></a>

## Contributors
- [Whitley Beers](https://github.com/WhitleyBeers)
