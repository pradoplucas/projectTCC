const del = require('del');

module.exports = async (dir) => {
	try {
		await del(dir);

		console.log(dir + ' is deleted!');
	} catch (err) {
		console.error('Error while deleting ' + dir);
	}
};
