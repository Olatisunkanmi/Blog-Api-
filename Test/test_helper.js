const userModel = require('../Models/userModel');
const postModel = require('../Models/postModel');

exports.dbUsers = async () => {
	return await (await userModel.find({})).map((cur) => cur.toJSON());
};

const dbPosts = async () => {
	return await (await postModel.find({})).map((cur) => cur.toJSON());
};

exports.createUserObj = (n) => {
	return {
		firstName: 'user',
		lastName: `${n}`,
		username: `user${n}`,
		email: `user${n}@mail.com`,
		password: '9876',
		password_confirm: '9876!',
	};
};

exports.userInit = () => {
	return require('./fixtures/user.json');
};

exports.postInit = () => {
	return require('./fixtures/post.json');
};

exports.createPostObj = (title) => {
	return {
		title,
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, est!',
		tags: ['lorem', 'royal'],
		body: `${title} - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus nam, eum a quod eius quasi modi tempore sed, pariatur totam amet corporis atque dolorum cupiditate! Nulla culpa modi reprehenderit deserunt laboriosam voluptatem incidunt quidem! Quibusdam, neque in eveniet temporibus id reiciendis quidem ratione voluptas accusamus voluptatibus, consectetur, vero odio deserunt tenetur provident non? Quasi necessitatibus minus veniam autem quos, numquam dolore quae nemo commodi. Tempora maiores dolore laborum veniam sed fuga eveniet facilis tenetur, possimus at distinctio iste a earum officiis laudantium nulla id necessitatibus amet et mollitia? Obcaecati doloribus et a nesciunt atque excepturi accusamus nostrum similique rem, optio voluptas ut tempora! Laudantium excepturi deleniti animi dolorum illo sequi, accusantium eius id quia, inventore dignissimos maiores? Voluptatem quasi exercitationem iusto autem possimus assumenda labore reprehenderit sequi nostrum.`,
	};
};
