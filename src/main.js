import { existsSync as exists } from 'fs'
import path from 'path'
import { transformFileSync as transform } from 'babel-core';

export default (query, babelOptions) => {
	query = path.resolve(query);
	if (exists(query)) {
		let { code } = transform(query, babelOptions);
		let m = new module.constructor()

		let nodeModules = path.join(process.cwd(), 'node_modules');

		if (!m.paths) {
			m.paths = [];
		}

		if (m.paths.indexOf(nodeModules) < 0) {
			m.paths.push(nodeModules);
		}

		m._compile(code, query);
		return m.exports;
	}
}
