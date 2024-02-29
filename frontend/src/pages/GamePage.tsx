import {Box, Link} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useApiClient} from "../contexts/ApiClientContext";
import {GameDto, PlatformDto, PlatformOfGameDto} from "../types/GameTypes";
import {DataGrid, GridColDef, GridToolbar, GridValueGetterParams} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Game ID',
        width: 70
    },
    {
        field: 'name',
        headerName: 'Name',
        description: 'This column has a value getter and is not sortable.',
        minWidth: 300,
        flex: 1,
        renderCell: (params) => (
            <Link href={`${params.row.infoLink}`}>{params.row.name || ''}</Link>
        ),
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.name || ''}`,
    },
    {
        field: 'platforms',
        headerName: 'Platforms',
        description: 'This column has a value getter and is not sortable.',
        minWidth: 200,
        flex: 0.8,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.platformsOfGame
                .map((item: PlatformOfGameDto) => item.platform)
                .map((item: PlatformDto) => item.shortName || item.name)
                .join(', ') || ''
            }`,
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

export default function GamePage() {
    const apiClient = useApiClient();
    const [games, setGames] = useState<Array<GameDto>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        apiClient.getGames(setGames, {
            onLoaded: (b) => setLoading(false)
        })
    }, []);

    return (
        <Box sx={{width: '100%'}}>
            <DataGrid
                rows={games}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            sourceType: false,
                            sourceId: false,
                        }
                    }
                }}
                slots={{
                    toolbar: GridToolbar
                }}
                autoHeight
                loading={loading}
                pageSizeOptions={[10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
