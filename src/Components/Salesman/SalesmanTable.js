import React, { useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import data from "../../Assets/salesman.json";
import SalesmanView from "./SalesmanView";
import SalesmanEdit from "./SalesmanEdit";
import ActionPopOver from "./ActionPopOver";

export default function SalesmanTable() {
    // eslint-disable-next-line
    const [salesman, setSalesman] = useState(data);
    // eslint-disable-next-line
    const [viewProfile, setViewProfile] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [actionPopOver, setActionPopOver] = useState(false);
    const ref = useRef(null);
    const handleOpenPopOver = (event) => {
      setActionPopOver(event.currentTarget);
    };
    const handleClosePopOver = () => {
      setActionPopOver(null);
    };
    const handleClose = () => {
        setOpenView(false);
        setOpenEdit(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // const handleEdit = (id) => {
    //     setOpenEdit(true);
    //     const viewedProfile = salesman.filter((data) => data.id === id);
    //     setViewProfile(viewedProfile);
    // };
    // const handleView = (id) => {
    //     setOpenView(true);
    //     const viewedProfile = salesman.filter((data) => data.id === id);
    //     setViewProfile(viewedProfile);
    // };
    // const handleDelete = (id) => {
    //     let newArray = salesman.filter((data) => data.id !== id);
    //     setSalesman(newArray);
    // };
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: "rgba(32, 101, 209, 0.1)",
                                color: "#2065d1",
                            }}
                        >
                            <TableCell sx={{ color: "#2065d1" }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ color: "#2065d1" }} align="center">
                                Phone Number
                            </TableCell>
                            <TableCell sx={{ color: "#2065d1" }} align="center">
                                National ID
                            </TableCell>
                            <TableCell sx={{ color: "#2065d1" }} align="center">
                                Address
                            </TableCell>
                            <TableCell sx={{ color: "#2065d1" }} align="center">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesman
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((salesman) => (
                                <TableRow
                                    key={salesman.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {salesman.first_name} &nbsp;{" "}
                                        {salesman.last_name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {salesman.phone}
                                    </TableCell>
                                    <TableCell align="center">
                                        {salesman.nid}
                                    </TableCell>
                                    <TableCell align="center">
                                        {salesman.address}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton ref={ref} onClick={handleOpenPopOver}>
                                            <MoreVertIcon />
                                        </IconButton>
                                            <ActionPopOver actionPopOver={actionPopOver} handleClosePopOver={handleClosePopOver} anchorEl={ref.current}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={salesman.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <SalesmanView
                open={openView}
                handleClose={handleClose}
                viewProfile={viewProfile}
            />
            <SalesmanEdit
                open={openEdit}
                handleClose={handleClose}
                viewProfile={viewProfile}
            />
        </Paper>
    );
}
