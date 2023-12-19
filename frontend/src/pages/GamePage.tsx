import { Box, Button, FormControl, InputLabel, Link, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Grid from '@mui/system/Unstable_Grid';
import { useEffect, useState } from "react";
import { GameWheel } from "../components/Wheel";
import { useApiClient } from "../contexts/ApiClientContext";
import { IGame, IGameOnPlatformDto, IPlatform } from "../types/GameTypes";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 110,
    //   editable: true,
    // },
    {
        field: 'game2',
        headerName: 'Game2',
        description: 'This column has a value getter and is not sortable.',
        width: 500,
        renderCell: (params) => (
          <Link href={`${params.row.infoLink}`}>{params.row.name || ''}</Link>
        ),
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.name || ''}`,
    },
    {
        field: 'game3',
        headerName: 'Game3',
        description: 'This column has a value getter and is not sortable.',
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.gamePlatforms || ''}`,
    },
    {
        field: 'sourceType',
        headerName: 'sourceType',
    },
    {
        field: 'sourceId',
        headerName: 'sourceId',
    },
];

export default function GameWheelPage() {
    const apiClient = useApiClient();
    const [games, setGames] = useState<Array<IGame>>([]);

    useEffect(() => {
        apiClient.getGames(setGames)
        console.log("!!!!!!!!!!!!!", games)
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={games}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
