import {forwardRef, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';
import AdvancedSelect from '@patientpattern/coat/ui/AdvancedSelect';
import Button from '@patientpattern/coat/ui/Button';
import Flyout from '@patientpattern/coat/ui/Flyout';
import Form from '@patientpattern/coat/ui/Form';
import Label from '@patientpattern/coat/ui/Label';
import Select from '@patientpattern/coat/ui/Select';
import {useCommonStore} from 'common/store';
import css from './Filters.module.scss';

const Filters = forwardRef(({formValues, onReset, onApply}, ref) => {
    const categories = useCommonStore(state => state.categories);
    const [areFiltersOpen, setAreFiltersOpen] = useState(false);
    const onFiltersToggle = () => {
        setAreFiltersOpen(open => !open);
    };
    const onResetClick = () => {
        onFiltersToggle();
        onReset();
    };
    const onSubmit = ({vote, categories: cats}) => {
        const newFilters = {};
        let newCategories = cats;

        if (vote) {
            newFilters.vote = vote;
        }

        if (cats && !Array.isArray(cats)) {
            newCategories = [cats];
        } else if (cats && Array.isArray(cats) && cats.length === 0) {
            newCategories = null;
        }

        if (newCategories) {
            newFilters.categories = newCategories;
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
                <Select
                    name="vote"
                    label={<Label>Voted</Label>}
                    items={[
                        {label: 'All', value: '0'},
                        {label: 'For', value: '1'},
                        {label: 'Against', value: '2'},
                        {label: 'Abstain', value: '3'},
                    ]}
                />
                <AdvancedSelect
                    input={{
                        name: 'categories',
                        label: <Label>Categories</Label>,
                    }}
                    isMulti
                    items={categories.map(({id, name}) => ({
                        label: name,
                        value: id,
                    }))}
                />
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
