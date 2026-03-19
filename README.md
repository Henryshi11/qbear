# QBear

QBear is a personal backend practice project built to explore how multiple parts of a software system connect in a real workflow.

The project combines:

- a Telegram bot
- a NestJS backend API
- a PostgreSQL database
- Prisma for data modeling
- Docker Compose for local database setup

This project was built mainly as a learning exercise rather than a finished production product. The goal was to practice backend development, database integration, service separation, and third-party platform interaction in one connected system.

---

## Purpose

I built QBear to move beyond isolated coding exercises and practice a more complete development pipeline.

Instead of only writing small scripts or standalone components, I wanted to understand how to connect:

- user interaction from Telegram
- bot-side command handling
- backend API endpoints
- persistent database storage
- environment-based configuration
- local development infrastructure

The project is currently paused, but it served its purpose as a technical practice project.

---

## What This Project Practices

QBear was mainly used to practice:

- backend API development with NestJS
- Telegram bot interaction with Telegraf
- relational data modeling with Prisma and PostgreSQL
- persistent user and state management
- request validation and simple shared-secret protection
- local database setup with Docker Compose
- modular separation between bot and backend services

---

## Current Architecture

The repository is split into three main parts:

### 1. `bot/`
A Telegram bot built with Telegraf.

It handles commands such as:

- `/start`
- `/stats`

The bot does not contain the main business logic. Instead, it sends requests to the backend service, which keeps the system more modular and easier to reason about.

### 2. `backend/`
A NestJS backend API.

It provides endpoints for:

- creating or initializing a user and bear state
- retrieving current bear statistics
- applying simple idle progression logic such as passive coin and experience updates

The backend is responsible for:

- validation
- database access
- game-state persistence
- basic request protection through a shared bot token

### 3. `infra/`
Contains Docker Compose configuration for running a local PostgreSQL database.

---

## Tech Stack

### Bot
- TypeScript
- Telegraf
- Axios
- dotenv

### Backend
- TypeScript
- NestJS
- Prisma
- PostgreSQL
- class-validator
- class-transformer

### Infrastructure
- Docker Compose
- PostgreSQL 16

---

## Features Implemented So Far

At its current stage, QBear includes:

- Telegram `/start` command support
- Telegram `/stats` command support
- backend endpoint for creating a new user and bear record
- backend endpoint for retrieving saved bear stats
- persistent storage of:
  - user ID
  - level
  - experience
  - coins
  - stamina
  - hunger
  - mood
- simple idle reward logic:
  - passive coins over time
  - passive experience over time
- Prisma schema and migrations
- shared-secret header protection for bot-to-backend requests

---

## Data Model

The current database design includes two main models:

### `User`
Stores the Telegram user identifier and creation time.

### `Bear`
Stores persistent state associated with a user, including:

- level
- exp
- coins
- hunger / hungerMax
- mood / moodMax
- stamina / staminaMax
- last activity timestamp
- last coin timestamp

This structure was designed to practice relational modeling and persistent state handling.

---

## Why the Bot and Backend Are Separate

One of the main things I wanted to practice in this project was separation of concerns.

Instead of putting all logic directly inside the Telegram bot handlers, I split the project into:

- a lightweight bot layer for receiving commands
- a backend layer for business logic and persistence

This helped me practice a more realistic multi-service workflow and understand how different components communicate in a backend system.

---

## Project Status

**Status:** Paused

This repository represents a learning project rather than a finished application.

The main goal was to practice:

- backend development
- database integration
- service communication
- system structure
- debugging across multiple connected components

Even though development is currently paused, the project helped me gain practical experience connecting a bot, an API service, and a database in one workflow.

---

## Local Development

### 1. Start the database

```bash
npm run db:up
