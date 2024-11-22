import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const data = [
  {
    id: 1,
    name: "Parent 1",
    children: [
      { id: 11, name: "Child 1.1" },
      { id: 12, name: "Child 1.2" },
    ],
  },
  {
    id: 2,
    name: "Parent 2",
    children: [{ id: 21, name: "Child 2.1" }],
  },
];

const NestedTable = ({ data, isExpanded }) => {
  return (
    <Table size='small'>
      <TableBody>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <TableRow>
              <TableCell>
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                {item.name}
              </TableCell>
            </TableRow>
            {isExpanded && (
              <TableRow>
                <TableCell style={{ paddingLeft: 24 }}>
                  <NestedTable data={item.children} />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

const App = () => {
  const [expandedRows, setExpandedRows] = React.useState([]);

  const handleExpandClick = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Parent</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((parent) => (
          <React.Fragment key={parent.id}>
            <TableRow>
              <TableCell>
                <IconButton onClick={() => handleExpandClick(parent.id)}>
                  {expandedRows.includes(parent.id) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
                {parent.name}
              </TableCell>
            </TableRow>
            {expandedRows.includes(parent.id) && (
              <TableRow>
                <TableCell style={{ paddingLeft: 24 }}>
                  <NestedTable data={parent.children} isExpanded={true} />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default App;
