'use client';

import * as React from 'react';

import { usePopover } from '@/hooks/use-popover';

import { workspaces, WorkspacesPopover } from './workspaces-popover';

export function WorkspacesSwitch() {
    const popover = usePopover();
    const _workspace = workspaces[0];

    return (
        <React.Fragment>
            {/* <Stack
                direction="row"
                onClick={popover.handleOpen}
                ref={popover.anchorRef}
                spacing={2}
                sx={{
                    alignItems: 'center',
                    border: '1px solid var(--Workspaces-border-color)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    p: '4px 8px',
                }}
            >
                <Avatar src={workspace.avatar} variant="rounded" />
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography color="var(--Workspaces-title-color)" variant="caption">
                        Workspace
                    </Typography>
                    <Typography color="var(--Workspaces-name-color)" variant="subtitle2">
                        {workspace.name}
                    </Typography>
                </Box>
                <CaretUpDownIcon color="var(--Workspaces-expand-color)" fontSize="var(--icon-fontSize-sm)" />
            </Stack> */}
            <WorkspacesPopover
                anchorEl={popover.anchorRef.current}
                onChange={popover.handleClose}
                onClose={popover.handleClose}
                open={popover.open}
            />
        </React.Fragment>
    );
}
