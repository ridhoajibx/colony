import { Dispatch, SetStateAction, useState } from 'react';
import Select, { GroupBase, OptionsOrGroups, Props as SelectProps } from 'react-select';
import OptionTypeBase from "react-select";

type Validator<T> = (value: T) => string | undefined;

// input
interface UseInputResult {
    value: string;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

interface UseInputOptions {
    defaultValue?: string;
    validate?: (value: string) => string | null;
}

const useInput = ({
    defaultValue = '',
    validate,
}: UseInputOptions = {}): UseInputResult => {
    const [value, setValue] = useState<string>(defaultValue);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const validationError = validate?.(newValue);
        //@ts-ignore
        setError(validationError);
        setValue(newValue);
    };

    const reset = () => {
        setError(null);
        setValue(defaultValue);
    };

    return {
        value,
        error,
        onChange: handleChange,
        reset,
    };
};


// text-area
interface UseTextAreaResult {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    error: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    reset: () => void;
}

const useTextArea = (initialValue: string, validator?: Validator<string>): UseTextAreaResult => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | undefined>(undefined);

    const validate = (value: string) => {
        if (!validator) {
            return undefined;
        }

        return validator(value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        const newError = validate(newValue);

        setValue(newValue);
        setError(newError);
    };

    const reset = () => {
        setValue(initialValue);
        setError(undefined);
    };

    return {
        value,
        setValue,
        error,
        onChange: handleChange,
        reset,
    };
};

// checkbox
interface UseCheckboxResult {
    checked: boolean;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

interface UseCheckboxOptions {
    defaultChecked?: boolean;
    validate?: (checked: boolean) => string | null;
}

const useCheckbox = ({
    defaultChecked = false,
    validate,
}: UseCheckboxOptions = {}): UseCheckboxResult => {
    const [checked, setChecked] = useState<boolean>(defaultChecked);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        const validationError = validate?.(newChecked);
        //@ts-ignore
        setError(validationError);
        setChecked(newChecked);
    };

    const reset = () => {
        setError(null);
        setChecked(defaultChecked);
    };

    return {
        checked,
        error,
        onChange: handleChange,
        reset,
    };
};

export default useCheckbox;


// react-select useHook
interface UseSelectResult<T extends OptionTypeBase> {
    value: T | null;
    options: T[] | OptionsOrGroups<T, GroupBase<T>>;
    error: string | null;
    onChange: (newValue: T | null) => void;
    reset: () => void;
}

interface UseSelectOptions<T extends OptionTypeBase> extends SelectProps<T> {
    defaultValue?: T;
    validate?: (value: T | null) => string | null;
}

const useSelect = <T extends OptionTypeBase>({
    options,
    defaultValue,
    validate,
    ...selectProps
}: UseSelectOptions<T>): UseSelectResult<T> => {
    const [value, setValue] = useState<T | null>(defaultValue ?? null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (newValue: T | null) => {
        const validationError = validate?.(newValue);
        // @ts-ignore
        setError(validationError);
        setValue(newValue);
    };

    const reset = () => {
        setError(null);
        setValue(defaultValue ?? null);
    };

    return {
        value,
        // @ts-ignore
        options,
        error,
        onChange: handleChange,
        reset,
    };
};


export { useInput, useTextArea, useSelect };
