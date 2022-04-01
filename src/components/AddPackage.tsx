import React, { useEffect, useState } from "react";
import { Controller, ErrorOption, useForm } from "react-hook-form";
import styled from "styled-components";
import { screenSize } from "../themes/global";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Header1 } from "../components/html/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { IIlionaCategory } from "../models/Ilionacategory";
import { checkFileMimetype, checkObjectIsEmpty } from "../utils/general";
import { fetchIlionaCategories } from "../store/slices/categories/categoryActions";
import { Spinner } from "../components/spinner/Spinner";
import { Alert } from "react-bootstrap";
import { injectIntl, WrappedComponentProps } from "react-intl";

const schema = yup
    .object({
        packageName: yup.string().required(),
        installationTime: yup.number().positive().integer().required(),
        category: yup.string().required(),
        dependencies: yup.string(),
        description: yup.string().required(),
        displayName: yup.string().required(),
        isVisible: yup.boolean().required(),
        licenseMessage: yup.string().required(),
        summary: yup.string().required(),
        publishDate: yup.string(),
        weight: yup.number().positive().integer().required(),
    })
    .required();

const AddPackageWrapper = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 1 / 13;
    flex-direction: column;
    background: white;

    @media ${screenSize.tablet} {
        grid-column: 2 / 12;
        margin: 3.2rem 0;
    }

    @media ${screenSize.desktop} {
        grid-column: 4 / 10;
        margin: 3.2rem 0;
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: 4px;
`;

const ErrorLine = styled.p`
    color: darkred;
    font-style: italic;
    margin-bottom: 4px;
`;

const TitleWrapper = styled.div`
    margin: 32px 32px 0 32px; ;
`;

const Textbox = styled.input`
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(p) => p.theme.primaryTextColor};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 24px;

    &:focus-visible {
        outline: -webkit-focus-ring-color 1px;
        outline-color: ${(p) => p.theme.primaryColor};
        outline-style: auto;
        outline-width: 1px;
    }
    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #999;
    }
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(p) => p.theme.primaryTextColor};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 24px;
    height: 130px;

    &:focus-visible {
        outline: -webkit-focus-ring-color 1px;
        outline-color: ${(p) => p.theme.primaryColor};
        outline-style: auto;
        outline-width: 1px;
    }

    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #999;
    }
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(p) => p.theme.primaryTextColor};
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 24px;

    &:focus-visible {
        outline: -webkit-focus-ring-color 1px;
        outline-color: ${(p) => p.theme.primaryColor};
        outline-style: auto;
        outline-width: 1px;
    }

    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #999;
    }
`;

const FormContent = styled.div`
    display: flex;
    flex-direction: row;
`;

const FormWrapper = styled.div`
    display: inline-flex;
    width: calc(60% - 64px);
    padding: 32px;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    display: inline-flex;
    width: 40%;
    margin-top: 60px;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    display: block;
    background: salmon;
    border: 1px solid hotpink;
    width: 100%;
    height: 170px;
`;

const FormItemsHalfSizeWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
`;

const SubmitButton = styled.input.attrs({
    type: "submit",
    value: "Submit",
})`
    padding: 4px 64px;
    background-color: ${(p) => p.theme.primaryColor};
    color: white;
    outline: none;
    border: none;
    font-size: 14px;

    &:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }
`;

const AddPackage = ({ intl }: WrappedComponentProps) => {
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageError, setimageError] = useState<string>("");
    const dispatch = useDispatch();
    let showSpinner = false;
    let showError = false;

    useEffect(() => {
        if (categories?.categories && categories?.categories.length === 0) {
            dispatch(fetchIlionaCategories());
        }
    }, []);

    useEffect(() => {
        if (categories?.categories && categories?.categories.length > 0) {
            setValue("category", categories.categories[0].RowKey);
        }
    }, [categories]);

    useEffect(() => {
        if (imageError && imageError !== "") {
            setimageError(imageError);
        }
    }, [imageError]);

    const errorText = intl.formatMessage({
        id: "errormessages.general",
        defaultMessage: "Er is iets fout gegaan, probeer het later opnieuw.",
    });

    if (categories?.isFetching) {
        showSpinner = true;
    }

    if (categories?.errorMessage) {
        showError = true;
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });
    const onSubmit = (data: any) => console.log(data);

    return (
        <>
            {showSpinner && <p data-testid="fake-spinner"></p>}
            {showError && <Alert variant="danger">{errorText}</Alert>}
            {!showSpinner && (
                <AddPackageWrapper>
                    <TitleWrapper>
                        <Header1>Add a package</Header1>
                    </TitleWrapper>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormContent>
                            <FormWrapper>
                                <Label htmlFor="displayName">Display name</Label>
                                {errors.displayName && (
                                    <ErrorLine role="alert" aria-label="display name">
                                        The display name is required
                                    </ErrorLine>
                                )}
                                <Textbox
                                    {...register("displayName")}
                                    id="displayName"
                                    name="displayName"
                                    placeholder="Display name of the package"
                                    autoFocus
                                />

                                <Label htmlFor="category">Category</Label>
                                {errors.category && (
                                    <ErrorLine role="alert" aria-label="category">
                                        Category is required
                                    </ErrorLine>
                                )}

                                <Select {...register("category")} id="category">
                                    {categories?.categories.map((cat: IIlionaCategory) => {
                                        return (
                                            <option key={cat?.RowKey} value={cat?.RowKey}>
                                                {cat?.RouteFriendlyName}
                                            </option>
                                        );
                                    })}
                                </Select>

                                <FormItemsHalfSizeWrapper>
                                    <div>
                                        <Label htmlFor="installationTime">Installation time</Label>
                                        {errors.installationTime && (
                                            <ErrorLine role="alert" aria-label="installation">
                                                Installation is required and should be a number
                                            </ErrorLine>
                                        )}
                                        <Textbox
                                            {...register("installationTime")}
                                            id="installationTime"
                                            name="installationTime"
                                            style={{
                                                display: "inline-block",
                                                width: "calc(100% - 16px)",
                                            }}
                                            placeholder="The time in minutes the package needs to isntall"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="weight">Weight</Label>
                                        {errors.weight && (
                                            <ErrorLine role="alert" aria-label="weight">
                                                The weight is required
                                            </ErrorLine>
                                        )}
                                        <Textbox
                                            {...register("weight")}
                                            id="weight"
                                            name="weight"
                                            style={{ display: "inline-block" }}
                                            placeholder="The weight of the package"
                                        />
                                    </div>
                                </FormItemsHalfSizeWrapper>

                                <Label htmlFor="summary">Summary</Label>
                                {errors.summary && (
                                    <ErrorLine role="alert" aria-label="summary">
                                        The summary is required
                                    </ErrorLine>
                                )}
                                <Textbox
                                    {...register("summary")}
                                    id="summary"
                                    name="summary"
                                    placeholder="The summary of the package"
                                />

                                <Label htmlFor="description">Description</Label>
                                {errors.description && (
                                    <ErrorLine role="alert" aria-label="description">
                                        description must be a string
                                    </ErrorLine>
                                )}
                                <TextArea
                                    {...register("description")}
                                    id="description"
                                    name="description"
                                    placeholder="If the package has any description please state them here."
                                />

                                <Label htmlFor="packageName">Package name</Label>
                                {errors.packageName && (
                                    <ErrorLine role="alert" aria-label="package name">
                                        Package name is required
                                    </ErrorLine>
                                )}
                                <Textbox
                                    {...register("packageName")}
                                    id="packageName"
                                    name="packageName"
                                    placeholder="The name of the package"
                                />

                                <Label htmlFor="dependencies">Dependencies</Label>
                                {errors.dependencies && (
                                    <ErrorLine role="alert" aria-label="dependencies">
                                        Dependencies must be a string
                                    </ErrorLine>
                                )}
                                <Textbox
                                    {...register("dependencies")}
                                    id="dependencies"
                                    name="dependencies"
                                    placeholder="If the package has any dependencies please state them here."
                                />

                                <Label htmlFor="licenseMessage">License message</Label>
                                {errors.licenseMessage && (
                                    <ErrorLine role="alert" aria-label="license">
                                        The license is required
                                    </ErrorLine>
                                )}
                                <Textbox
                                    {...register("licenseMessage")}
                                    id="licenseMessage"
                                    name="licenseMessage"
                                    placeholder="The license message of the package"
                                />

                                <Label htmlFor="isVisible">Visible</Label>
                                {errors.isVisible && (
                                    <ErrorLine role="alert" aria-label="visibility">
                                        Visible is required
                                    </ErrorLine>
                                )}

                                <Label
                                    htmlFor="isVisible-yes"
                                    style={{
                                        display: "inline-block",
                                        marginRight: "32px",
                                    }}
                                >
                                    <input
                                        {...register("isVisible")}
                                        type="radio"
                                        name="isVisible"
                                        value="true"
                                        id="isVisible-yes"
                                    />
                                    &nbsp; Yes
                                </Label>
                                <Label
                                    htmlFor="isVisible-no"
                                    style={{
                                        display: "inline-block",
                                        marginRight: "32px",
                                    }}
                                >
                                    <input
                                        {...register("isVisible")}
                                        type="radio"
                                        name="isVisible"
                                        value="false"
                                        id="isVisible-no"
                                    />
                                    &nbsp; No
                                </Label>

                                <SubmitButton
                                // disabled={!checkObjectIsEmpty(errors) || imageError !== "" || image === undefined}
                                />
                            </FormWrapper>
                            <ImageWrapper>
                                <ImageContainer></ImageContainer>
                                <Label htmlFor="imageUrl" style={{ marginTop: "24px" }}>
                                    Image
                                </Label>
                                {imageError && (
                                    <ErrorLine role="alert" aria-label="image" data-testid="image-error">
                                        {imageError}
                                    </ErrorLine>
                                )}
                                <p>{image?.name}</p>
                                <input
                                    id="imageUrl"
                                    type="file"
                                    data-testid="image-upload-button"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    {...register("imageUrl")}
                                    onChange={async (event) => {
                                        if (event?.currentTarget?.files) {
                                            await checkFileMimetype(
                                                event.currentTarget.files[0],
                                                setImage,
                                                setimageError
                                            );
                                        }
                                    }}
                                />
                            </ImageWrapper>
                        </FormContent>
                    </form>
                </AddPackageWrapper>
            )}
        </>
    );
};

export default injectIntl(AddPackage);
