import React from "react";
import axios from "axios";

export default class CdnjsSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchQuery: "jquery",
      result: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    if (!this.state.searchQuery) {
      return;
    }

    const url = `https://api.cdnjs.com/libraries/${this.state.searchQuery}`;
    this.setState({ isLoading: true });
    axios.get(url).then(response => {
      this.setState({ isLoading: false, result: response.data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.getData();
  };

  handleInputChange = async e => {
    await this.setState({ searchQuery: e.target.value.trim() });

    this.getData();
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  render() {
    const { name, filename, version, description, license, assets = [] } = this.state.result;
    return (
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.searchQuery} onChange={this.handleInputChange} />
        </form>
        {this.state.isLoading ? (
          <div style={{ marginTop: "40px" }}>
            <h2>Loading...</h2>
          </div>
        ) : this.isEmpty(this.state.result) ? (
          <div style={{ marginTop: "40px" }}>
            <h2>Not Found.</h2>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <label>Name</label> {name} <br />
            <label>File Name</label> {filename} <br />
            <label>Version</label> {version} <br />
            <label>Description</label> {description} <br />
            <label>License</label> {license} <br />
            <label>All Versions</label>
            <div>
              {assets.map(x => (
                <div key={x.version.toString()}>{x.version}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
