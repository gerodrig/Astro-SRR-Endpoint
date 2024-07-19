import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
		{id: 1, name: 'Benito', age: 7, isActive: true},
		{id: 2, name: 'Mimi', age: 17, isActive: true},
		{id: 3, name: 'Emma', age: 1, isActive: true},
		{id: 4, name: 'Yayna', age: 37, isActive: true},
		{id: 5, name: 'Gerardo', age: 37, isActive: true},

	]);

	const posts = await getCollection('blog');

	await db.insert(Posts).values(
		posts.map((post) => ({
			id: post.id,
			title: post.data.title,
			likes: Math.round(Math.random() * 100),
		}))
	)



	console.log('Seed Executed');
}
