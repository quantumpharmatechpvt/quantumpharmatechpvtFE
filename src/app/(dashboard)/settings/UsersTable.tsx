"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField as MrtGlobalFilterTextField,
} from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CreateCostCenterModal } from "@/components/Modals/UerAddModal";
import {
  addClientUser,
  fetchClientUsers,
  setCreateCostCenterModalOpen,
  setEditCostCenterModalOpen,
  updateClientUser,
} from "@/components/slices/usersSlice";
import { EditCostCenterModal } from "@/components/Modals/UserEditModal";
import { store } from "@/components/redux/store";

const useCostCentersTable = () => {
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState<any>();
  const { createCostCenterModalOpen, editCostCenterModalOpen, users } =
    useSelector((state: any) => state.userSlice);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [reFetch, setReFetech] = useState<boolean>(false);

  const handleOpenCreateUserModal = () => {
    dispatch(setCreateCostCenterModalOpen(true));
  };
  const fetchusers = () => {
    try {
      store.dispatch(fetchClientUsers()).then((res: any) => {
        console.log(res, "res");
        setData(res.payload.data);
        setIsLoading(false);
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchusers();
  }, [reFetch]);
  const createCostCenter = (data: any) => {
    if (data) {
      try {
        store.dispatch(addClientUser(data));
        setReFetech((p) => !p);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  const handleUpdateCostCenters = (data: any) => {
    console.log(data, "daataa");
    try {
      store.dispatch(updateClientUser(data));
      setReFetech((p) => !p);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleOpenEditUserModal = (id: number) => {
    const updateData = data.find((item: any) => item.id === id);
    setUpdateData(updateData);
    dispatch(setEditCostCenterModalOpen(true));
  };
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
        muiTableBodyCellProps: {
          sx: {
            alignItems: "center",
            padding: "20px",
          },
        },
        muiTableHeadCellProps: {
          sx: {
            alignItems: "center",
            padding: "20px",
          },
        },
      },
      {
        accessorKey: "email",
        header: "Gmail",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "phoneNo",
        header: "Phone Number",
        size: 200,
      },
      {
        accessorKey: "age",
        header: "Age",
        size: 200,
      },
      {
        accessorKey: "password",
        header: "password",
        size: 200,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: data,
    enablePagination: false,
    enableStickyHeader: true,
    enableDensityToggle: false,
    enableBottomToolbar: false,
    enableGlobalFilterModes: true,
    enableColumnActions: false,
    positionActionsColumn: "last",
    initialState: {
      showGlobalFilter: true,
      density: "compact",
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
      },
    },
    muiTableContainerProps: {
      sx: { maxHeight: "51.5vh", width: "100%" },
    },
    renderTopToolbar: () => (
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateUserModal}
        >
          Add User
        </Button>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <MrtGlobalFilterTextField table={table} />
        </Box>
      </Box>
    ),
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <IconButton
        onClick={() => handleOpenEditUserModal(row!.original!.id as number)}
      >
        <EditIcon />
      </IconButton>
    ),
  });
  return {
    table,
    isLoading: isLoading,
    createCostCenterModalOpen,
    createCostCenter,
    editCostCenterModalOpen,
    updateData,
    handleUpdateCostCenters,
  };
};
export const CostCentersTable = () => {
  const {
    table,
    isLoading,
    createCostCenterModalOpen,
    createCostCenter,
    editCostCenterModalOpen,
    updateData,
    handleUpdateCostCenters,
  } = useCostCentersTable();
  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box>
      <MaterialReactTable table={table} />
      <CreateCostCenterModal
        open={createCostCenterModalOpen}
        createCostCenter={createCostCenter}
      />
      <EditCostCenterModal
        open={editCostCenterModalOpen}
        updateData={updateData}
        updateCostCenter={handleUpdateCostCenters}
      />
    </Box>
  );
};
