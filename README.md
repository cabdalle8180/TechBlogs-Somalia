📘 Tech Blog Website – General Requirements
🔰 Introduction
This Tech Blog Website is going be a user-friendly platform where tech enthusiasts, developers, and writers can share their knowledge, ideas, and updates on various technology topics. This project is designed to support both content creators and readers by providing essential features such as user accounts, personalized dashboards, blog post management, and an intuitive browsing experience. The goal is to foster a vibrant community of tech-savvy users who regularly contribute and consume valuable content.

1. 👤 User Accounts
Visitors can sign up by providing their name, email address, and a secure password.
Registered users can log in using their email and password.
After logging in, users are redirected to a personal dashboard where they can manage their blog posts.
2. 🏠 Home Page
The homepage welcomes visitors and introduces the blog.
The hero section at the top highlights the most recent blog post, displaying:
Title
Featured image
Short preview or excerpt
Below the hero section, additional recent blog posts are showcased in a grid or list format.
3. 📝 Blog Page
Displays a collection of all published blog posts in one place.
Each blog entry shows:
Title
Category
Thumbnail image
Brief preview/excerpt
Visitors can click “Read More” to view the full content.
Optional features:
Search bar to find specific posts
Category filter to narrow down topics
4. ✉️ Contact Page
This page provides contact information only—there is no message submission form.
Visitors can find:
Email address
Phone number (if applicable)
Social media links (e.g., Twitter, LinkedIn)
Physical address (if relevant)
The purpose is to allow users and readers to reach out through the provided channels outside the website.
5. 🧑‍💼 User Dashboard (Logged-In Users Only)
Users have access to a dashboard displaying all their submitted blog posts.
Each post listing includes:
Title
Category
Publish date
Users can:
Create a new blog post
Edit existing blog posts
Delete posts they no longer wish to keep published
6. 🖊️ Creating a Blog Post
Users can create new blog content through a dedicated form.
The form includes:
Post title
Category or topic (e.g., Tech, Coding, AI)
Featured image
Blog content using a rich text editor with support for:
Paragraphs
Headings
Links, code snippets, lists, etc.
7. 📄 Individual Blog Post Page
Clicking a blog post opens a page showing the full content.
The page includes:
Title
Category
Featured image
Full written content
Optional details: Author name and publish date
8. 🔒 User Permissions & Security
Only registered and logged-in users can create, edit, or delete their own blog posts.
The system keeps track of post ownership to ensure users can only manage their own content.
Unauthorized access or editing of others’ content is strictly restricted

---

## Run locally

1) Backend env
- Copy `backend/.env.example` to `backend/.env`
- Update `mongodbUrl` and `JWT_SECRET` (Cloudinary is optional)

2) Install + run

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

## Notes
- Auth uses an **httpOnly cookie** (`access_token`).
- Sign in supports **email + password** (per requirements).

































