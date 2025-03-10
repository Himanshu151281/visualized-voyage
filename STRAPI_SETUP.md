
# Strapi Backend Setup

This document explains how to set up a Strapi backend to work with our dashboard application.

## Installation

1. Create a new Strapi project:
```bash
npx create-strapi-app@latest my-dashboard-backend --quickstart
```

2. Once Strapi starts, create an admin user and access the admin panel.

## Content Types Setup

### 1. Projects
Create a collection type called "Project" with the following fields:
- `title` (Text)
- `description` (Rich Text or Long Text)
- `status` (Enumeration: active, completed, on-hold)
- `progress` (Number: integer, min: 0, max: 100)
- `category` (Text)
- `dueDate` (Date)
- `teamMembers` (Component: Array of Team Members)

### 2. Team Members Component
Create a component called "Team Member" with the following fields:
- `name` (Text)
- `avatar` (Text: URL to avatar image)

### 3. Portfolio Items
Create a collection type called "Portfolio Item" with the following fields:
- `title` (Text)
- `description` (Rich Text or Long Text)
- `language` (Text)
- `author` (Text)
- `image` (Media: single file)

### 4. Statistics
Create a collection type called "Statistic" with the following fields:
- `title` (Text)
- `value` (Text)
- `change` (Number: decimal)
- `icon` (Text: name of the icon, e.g., "briefcase", "trending-up", "check-circle", "users")
- `color` (Text: color name, e.g., "blue", "green", "purple", "orange")

## API Permissions

1. Go to Settings > Roles > Public
2. Allow the following permissions for the Public role:
   - Project: find, findOne
   - Portfolio Item: find, findOne
   - Statistic: find, findOne

## Sample Data

Create at least:
- 6 Projects (some active, some completed, one on-hold)
- 5 Portfolio Items
- 4 Statistics

## CORS Configuration

If you experience CORS issues, configure CORS settings in Strapi:

1. Go to Settings > Global Settings > CORS
2. Add your frontend URL (e.g., http://localhost:5173) to the allowed origins

## Configuration for Production

For production deployment:
1. Set up a database (PostgreSQL recommended)
2. Configure environment variables
3. Set up proper authentication and permissions

For more information, refer to the [Strapi Documentation](https://docs.strapi.io/).
