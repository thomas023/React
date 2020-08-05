import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootstrap from "react-bootstrap";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const App = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { SearchBar } = Search;

  const getListData = async () => {
    try {
      const data = await axios.get("http://localhost:4000/results");
      console.log(data);
      setList(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { dataField: "dept_name", text: "DepartMent" },
    { dataField: "Tr_type", text: "Transmission Type", sort: true },
    { dataField: "E_type", text: "Entry Type", sort: true },
    { dataField: "Msg_des", text: "Message Description", sort: true },
    { dataField: "cr_date", text: "Created Date", sort: true },
    { dataField: "ch", text: "Channel", sort: true },
    { dataField: "Del", text: "Delivered", sort: true },
    { dataField: "fl", text: "Failed", sort: true },
    {
      dataField: "report",
      text: "Show Detailed Report",
    },
  ];
  
  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <ToolkitProvider keyField="name" data={list} columns={columns} search>
          {(props) => (
            <div>
              <div className="serSec">
                <h3 className="hdrOne">Search:</h3>
                <SearchBar {...props.searchProps} />
              </div>

              <div class="table-responsive">
                <BootstrapTable
                  {...props.baseProps}
                  filter={filterFactory()}
                  pagination={paginationFactory()}
                  
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <ReactBootstrap.Spinner animation="border" />
      )}
    </div>
  );
};

export default App;
