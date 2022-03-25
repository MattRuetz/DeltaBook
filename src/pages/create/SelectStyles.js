export const selectStyles = {
    menu: (provided, state) => ({
        ...provided,
        // width: state.selectProps.width,
        border: '1px solid var(--highlight-color)',
        color: 'var(--highlight-color)',
        background: 'var(--bg-color)',
        padding: 20,
        boxShadow: '2px 2px 8px black',
    }),

    control: (_, { selectProps: { width } }) => ({
        width: width,
        border: '1px dashed var(--highlight-color)',
        borderRadius: '2px',
        display: 'flex',
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {
            ...provided,
            opacity,
            transition,
            color: 'var(--text-color)',
        };
    },
    multiValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {
            ...provided,
            opacity,
            transition,
            background: 'var(--text-color)',
            color: 'var(--bg-color)',
        };
    },
};

export default selectStyles;
