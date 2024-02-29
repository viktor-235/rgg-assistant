import { Clear, Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import MaskedInput, { PipeConfig } from "react-text-mask";
import { useApiClient } from "../../contexts/ApiClientContext";
import {CollectedGameStatus, CollectedGamePlatformDto, CollectedGamePlatformUpdateDto} from "../../types/GameTypes";
import { CollectedGameAvatar, CollectedGameStatusText } from "./CollectedGameStatus";

interface CollectedGameDialogProps {
    game: CollectedGamePlatformDto;
    onClose(): void;
    onUpdate(): Promise<void>;
    onDelete(): Promise<void>;
}

export default function CollectedGameDialog({ game, onClose, onUpdate, onDelete }: CollectedGameDialogProps) {
    const apiClient = useApiClient();
    const [changedData, setChangedData] = useState<CollectedGamePlatformDto>(game);
    const [changed, setChanged] = useState<boolean>(false);

    function handleSpentTimeChanged(conformedValue: string, config: PipeConfig) {
        if (conformedValue === changedData.spentTime || (conformedValue === config.placeholder && changedData.spentTime == undefined))
            return conformedValue

        if (!config.rawValue) {
            setChangedData({ ...changedData, spentTime: undefined })
            setChanged(true)
            return conformedValue
        }
        if (config.previousConformedValue == undefined)
            return conformedValue

        if (conformedValue === config.placeholder) {
            setChangedData({ ...changedData, spentTime: undefined })
            setChanged(true)
        }
        else {
            const newVal = conformedValue.replaceAll('_', '0')
            setChangedData({ ...changedData, spentTime: newVal })
            setChanged(true)
        }
        return conformedValue
    }

    const handleSave = () => {
        if (changed) {
            const cgpUpdate: CollectedGamePlatformUpdateDto = {
                id: changedData.id,
                collectionDate: changedData.collectionDate,
                status: changedData.status,
                spentTime: changedData.spentTime,
                comment: changedData.comment,
                gamePlatformId: changedData.gamePlatform.id
            };
            apiClient.updateCollectedGamePlatform(cgpUpdate)
                .then(() => {
                    return onUpdate()
                })
                .then(() => {
                    onClose()
                })
        } else
            onClose()
    };

    const handleDelete = async () => {
        if (game) {
            onDelete()
                .then(() => {
                    onClose()
                })
        }
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
            // fullWidth={true}
            maxWidth="xl"
            aria-labelledby="collected-game-dialog-title"
        >
            <DialogTitle id="collected-game-dialog-title">
                {changedData?.gamePlatform?.game?.name} <Typography display="inline" color="gray" >
                    ({changedData?.gamePlatform?.platform.name})
                </Typography>
                <IconButton
                    aria-label="Close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle >
            <DialogContent>
                <FormControl>
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="caption" color="rgba(0, 0, 0, 0.6)" sx={{ display: "block", marginLeft: 1 }}>
                                Completion status
                            </Typography>
                            <ToggleButtonGroup
                                value={changedData.status}
                                exclusive
                                onChange={(e, n) => {
                                    setChanged(true)
                                    setChangedData({ ...changedData, status: n })
                                }}
                                color="primary"
                                aria-label="Completion status"
                            >
                                {Object.values(CollectedGameStatus).map(status => (
                                    <ToggleButton value={status} sx={{ paddingLeft: 2, paddingRight: 2 }} key={'status-toggle-' + status}>
                                        <CollectedGameAvatar status={status} sx={{ width: 32, height: 32 }} />
                                        <CollectedGameStatusText status={status} sx={{ paddingLeft: 1 }} />
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </div>
                        <MaskedInput
                            mask={[/\d/, /\d/, /\d/, ':', /[0-5]/, /\d/, ':', /[0-5]/, /\d/]}
                            showMask={true}
                            defaultValue={changedData.spentTime}
                            pipe={handleSpentTimeChanged}
                            render={(innerRef, props) => (
                                <TextField
                                    {...props}
                                    label="Spent time (hhh:mm:ss)"
                                    inputRef={innerRef}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton sx={{ visibility: changedData.spentTime ? 'visible' : 'hidden' }}
                                                onClick={() => {
                                                    setChanged(true)
                                                    setChangedData({ ...changedData, spentTime: '' })
                                                }}
                                            ><Clear /></IconButton>)
                                    }}
                                />
                            )}
                        />
                        <TextField
                            label="Comment"
                            multiline
                            value={changedData.comment || undefined}
                            onChange={(e) => {
                                setChanged(true)
                                setChangedData({ ...changedData, comment: e.target.value })
                            }}
                        />
                        <Typography gutterBottom>
                            Collection date: {changedData?.collectionDate?.toLocaleString()}
                        </Typography>
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="error">
                    Delete game
                </Button>
                <Button autoFocus onClick={handleSave}>
                    Save changes
                </Button>
            </DialogActions>
        </Dialog >
    )
}
