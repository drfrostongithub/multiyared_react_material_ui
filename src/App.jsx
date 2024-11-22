import DataTable from "./page/Table";
import Nesting from "./page/Nesting";
function App() {
  return (
    <>
      <div>
        <h1>Table With CRUD</h1>
        <DataTable />
        {/* <TableExample /> */}
        <Nesting />
      </div>
    </>
  );
}

export default App;
