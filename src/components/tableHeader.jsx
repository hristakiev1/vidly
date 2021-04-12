import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort(path) {
    let sortColmn = { ...this.props.sortColmn };
    if (sortColmn.path === path && sortColmn.order === "asc")
      sortColmn = { path, order: "desc" };
    else sortColmn = { path, order: "asc" };
    this.props.onSort(sortColmn);
  }

  renderSortIcon = (column) => {
    let className = "fa fa-sort-";
    const { sortColmn } = this.props;
    if (sortColmn.path !== column.path) className = null;
    sortColmn.order === "asc" ? (className += "asc") : (className += "desc");
    return <i className={className} aria-hidden="true"></i>;
  };

  render() {
    return (
      <thead>
        <tr className="clickable">
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
