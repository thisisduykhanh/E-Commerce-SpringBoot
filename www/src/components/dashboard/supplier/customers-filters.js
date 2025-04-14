'use client';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';
import { paths } from '@/paths';

import { useCustomersSelection } from './customers-selection-context';

// The tabs should be generated using API data.


export function CustomersFilters({ filters = {}, sortDir = 'desc' }) {
    const { email, phone, status } = filters;

    const router = useRouter();

    const selection = useCustomersSelection();

    const updateSearchParams = React.useCallback(
        (newFilters, newSortDir) => {
            const searchParams = new URLSearchParams();

            if (newSortDir === 'asc') {
                searchParams.set('sortDir', newSortDir);
            }

            if (newFilters.status) {
                searchParams.set('status', newFilters.status);
            }

            if (newFilters.name) {
                searchParams.set('name', newFilters.name);
            }

            if (newFilters.phone) {
                searchParams.set('phone', newFilters.phone);
            }

            router.push(`${paths.dashboard.suppliers.list}?${searchParams.toString()}`);
        },
        [router]
    );

    const handleClearFilters = React.useCallback(() => {
        updateSearchParams({}, sortDir);
    }, [updateSearchParams, sortDir]);

   

    const handleEmailChange = React.useCallback(
        (value) => {
            updateSearchParams({ ...filters, email: value }, sortDir);
        },
        [updateSearchParams, filters, sortDir]
    );

    const handlePhoneChange = React.useCallback(
        (value) => {
            updateSearchParams({ ...filters, phone: value }, sortDir);
        },
        [updateSearchParams, filters, sortDir]
    );

    const handleSortChange = React.useCallback(
        (event) => {
            updateSearchParams(filters, event.target.value);
        },
        [updateSearchParams, filters]
    );

    const hasFilters = status || email || phone;

    return (
        <div>

           
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
                    <FilterButton
                        displayValue={email}
                        label="Email"
                        onFilterApply={(value) => {
                            handleEmailChange(value);
                        }}
                        onFilterDelete={() => {
                            handleEmailChange();
                        }}
                        popover={<EmailFilterPopover />}
                        value={email}
                    />
                    <FilterButton
                        displayValue={phone}
                        label="Số điện thoại"
                        onFilterApply={(value) => {
                            handlePhoneChange(value);
                        }}
                        onFilterDelete={() => {
                            handlePhoneChange();
                        }}
                        popover={<PhoneFilterPopover />}
                        value={phone}
                    />
                    {hasFilters ? <Button onClick={handleClearFilters}>Xoá bộ lọc</Button> : null}
                </Stack>
                {selection.selectedAny ? (
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <Typography color="text.secondary" variant="body2">
                            Đã chọn {selection.selected.size}
                        </Typography>
                        <Button color="error" variant="contained">
                            Xoá
                        </Button>
                    </Stack>
                ) : null}
                <Select
                    name="sort"
                    onChange={handleSortChange}
                    sx={{ maxWidth: '100%', width: '120px' }}
                    value={sortDir}
                >
                    <Option value="desc">Mới nhất</Option>
                    <Option value="asc">Cũ nhất</Option>
                </Select>
            </Stack>
        </div>
    );
}

function EmailFilterPopover() {
    const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        setValue(initialValue ?? '');
    }, [initialValue]);

    return (
        <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Lọc bằng email">
            <FormControl>
                <OutlinedInput
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            onApply(value);
                        }
                    }}
                    value={value}
                />
            </FormControl>
            <Button
                onClick={() => {
                    onApply(value);
                }}
                variant="contained"
            >
                Apply
            </Button>
        </FilterPopover>
    );
}

function PhoneFilterPopover() {
    const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        setValue(initialValue ?? '');
    }, [initialValue]);

    return (
        <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Lọc bằng số điện thoại">
            <FormControl>
                <OutlinedInput
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            onApply(value);
                        }
                    }}
                    value={value}
                />
            </FormControl>
            <Button
                onClick={() => {
                    onApply(value);
                }}
                variant="contained"
            >
                Apply
            </Button>
        </FilterPopover>
    );
}
