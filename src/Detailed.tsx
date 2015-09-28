import React = require("react");
import semver = require('semver');

import { Library } from './Index';

function SortVersion(a: string, b: string) {
	if (semver.gt(a, b)) return -1;
	if (semver.lt(a, b)) return 1;
	return 0;
}

class Props {
	  public library: Library;
}

class Component extends React.Component<Props, {}> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		var lib = this.props.library;
		var name = lib.name;
		var homepage = lib.homepage;
		var stars = lib.stars;

		var vkeys = Object.keys(lib.versions).sort(SortVersion);

		var versions: JSX.Element[] = vkeys.map((k): JSX.Element => {
			var vdata = lib.versions[k];
			var zip = vdata.zipball_url;
			return <div key={k} className="label label-success vspan breaker">{k}</div>
		});

		var header = <h4 className="list-group-item-heading">{name}</h4>;
		if (homepage!="") {
			header =
			<h4 className="list-group-item-heading">
				<a href={homepage}>{name}</a>
			</h4>;
		}

		var rating = 
		<button type="button" className="btn btn-default btn-lg" disabled={true}>
			Stars: {stars}
		</button>

		var rating2 = 
		<span>
			Stars: {stars}
		</span>

		return <div className="list-group col-lg-6 col-lg-offset-3 rgroup col-md-12">
			<div className="list-group-item">
				<p className="pullright">
					{rating2}
				</p>
				{header}
				<p className="list-group-item-text">
					{this.props.library.description}
				</p>
				<p className="centered">
					{versions}
				</p>
			</div>
		</div>;
	}
}

export = Component;