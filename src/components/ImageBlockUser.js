import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none'
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));


export const ImageBlockUser = ({image, setImage, previewImage, setPreviewImage}) => {

    const classes = useStyles();

    const handleDelete = () => {
        URL.revokeObjectURL(image);
        setImage('');
        setPreviewImage('')
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleFileChange = (e)=>{
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div style={{marginLeft:"50px", display: "inline-block"}}>
            <div style={{display:'flex'}}>
                <input
                    accept="image/*" // Define accepted file types if needed
                    className={classes.input}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        className={classes.button}
                    >
                        Upload File
                    </Button>
                </label>
                {previewImage && (
                    <div style={{position:'relative'}}>
                        <img
                            style={{maxWidth:'200px', maxHeight:"50px"}}
                            src={previewImage}
                            alt="Uploaded"
                        />
                        <span
                            style={{
                                position:'absolute',
                                content:'',
                                top:'-12px',
                                right:'-7px',
                                color: 'red',
                                cursor:'pointer',
                                fontSize:'22px'
                            }}
                            onClick={handleDelete}>X</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageBlockUser;