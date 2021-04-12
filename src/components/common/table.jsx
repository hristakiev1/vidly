import React from "react";
import TableHeader from "../tableHeader";
import TableBody from "../tablebody";

const Table = ({ columns, data, onSort, sortColmn }) => {
  return (
    <table className="table table-striped">
      <TableHeader sortColmn={sortColmn} columns={columns} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
