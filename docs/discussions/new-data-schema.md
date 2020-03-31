<!--[meta]
section: discussions
title: Backend Overhaul
[meta]-->

# A New Data Schema For Keystone

We are excited to announce a **new and improved data schema** for KeystoneJS 🎉.
The new data schema simplifies the way your data is stored and will unlock the development of new functionality within Keystone.

** 🚨You will need to make changes to your database to take advantage of the new data schema. Read on for details of how to do this.**

## Background

Keystone provides an extremely powerful graphQL API which includes filtering, sorting, and nested queries and mutations.
The full CRUD API is generated from the simple `List` definitions provided by you, the developer.
All of this functionality is powered by our _database adapters_, which convert your graphQL queries into SQL/NoSQL queries and then convert the results back to graphQL.

Keystone needs to know about, and manage, the schema of the underlying database so it can correctly construct its queries.
We designed our database schemas when we first developed the database adapters, and they have served us very well.
In particular, we have come a long way with our support for complex relationships using the database schemas we initially developed.
By keeping a consistent schema, users have been able to stay up to date with Keystone updates without having to make changes to their data.

Unfortunately we have now outgrown this original schema.
More and more we are finding that certain bugs are hard to fix, and certain features difficult to implement, because of the limitations of our initial design.
While it has served us well, it's time for an upgrade.

## The Problem

The key challenge in designing our schema is how we represent relationships between lists.
Our initial designe borrowed heavily from a `MongDB` inspired pattern, where each object was responsible for tracking its related items.
This made the initial implementation very simple, particularly for the `MongoDB` adapter.
The `PostgreSQL` adapter was more complex, as it had to emulate the patterns from `MongoDB`, but it also worked.

One of the design trade-offs in the initial schema was that we denormalised the data in order to simplify the query generation.
This means we stored duplicated data in the database, but we could very quickly perform lookups without requiring complex queries.

Unfortunately, this trade off is no longer working in our favour.
Maintaining the denormalised data is now more complex than generating queries against normalised data.
We are finding that some reported bugs are difficult to resolve.
There are also more sophisticated relationship patterns, such as ordered relationships, which are too difficult to implement in the current schema.

## The Solution

To address these problems at their core we have changed our data schema to be normalised and to eliminate the duplicated data.
These means that our query generation code has become more complex, but this trade off gains us a large number of benefits:

- Eliminates duplicated data in the data.
- Uses a more conventional database schema design, particular for `PostgreSQL`.
- More robust query generation.
- More extensible relationship patterns.

## Updating your database

## Summary
