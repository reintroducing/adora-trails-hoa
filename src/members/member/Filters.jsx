import {forwardRef, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@patientpattern/coat/ui/Button';
import Flyout from '@patientpattern/coat/ui/Flyout';
import Form from '@patientpattern/coat/ui/Form';
import Label from '@patientpattern/coat/ui/Label';
import Select from '@patientpattern/coat/ui/Select';
import css from './Filters.module.scss';

const Filters = forwardRef(({formValues, onReset, onApply}, ref) => {
    const [areFiltersOpen, setAreFiltersOpen] = useState(false);
    const onFiltersToggle = () => {
        setAreFiltersOpen(open => !open);
    };
    const onResetClick = () => {
        onFiltersToggle();
        onReset();
    };
    const onSubmit = ({
        organization,
        provider,
        discharge_reason: dischargeReason,
    }) => {
        const newFilters = {};

        if (organization && organization !== '') {
            newFilters.organization = organization;
        }

        if (provider && provider !== '') {
            newFilters.provider = provider;
        }

        if (dischargeReason && dischargeReason !== '') {
            // eslint-disable-next-line camelcase
            newFilters.discharge_reason = dischargeReason;
        }

        onApply(newFilters);
    };

    useImperativeHandle(ref, () => ({
        toggle: onFiltersToggle,
    }));

    return (
        <Flyout
            isOpen={areFiltersOpen}
            title="Filters"
            onRequestClose={onFiltersToggle}
        >
            <Form defaultValues={formValues} onSubmit={onSubmit}>
                {/* {filterableColumns.includes('organization') && (
                    <Select
                        name="organization"
                        label={<Label>Facility</Label>}
                        items={facilityItems}
                    />
                )}
                {filterableColumns.includes('provider') && (
                    <Select
                        name="provider"
                        label={<Label>Provider</Label>}
                        items={providerItems}
                    />
                )}
                {filterableColumns.includes('dischargeReason') && (
                    <Select
                        name="discharge_reason"
                        label={<Label>Discharge Reason</Label>}
                        items={dischargeReasonItems}
                    />
                )} */}
                <div className={css.actions}>
                    <Button
                        testAttr="reset"
                        variant="neutral"
                        type="reset"
                        block
                        onClick={onResetClick}
                    >
                        Reset
                    </Button>
                    <Button
                        testAttr="apply"
                        variant="primary"
                        type="submit"
                        block
                        onClick={onFiltersToggle}
                    >
                        Apply
                    </Button>
                </div>
            </Form>
        </Flyout>
    );
});

Filters.propTypes = {
    formValues: PropTypes.object,
    onReset: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
};

export default Filters;
