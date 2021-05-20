import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FavouriteMovies() {
    const {handleSubmit, control} = useForm();
    const [startDate, setStartDate] = useState(new Date());
    return(
        <div id="favourite">
            <Controller name="dateofbirth" control={control} defaultValue={null} rules={{required: true}}
                render ={
                    ({onChange, value}) =>
                    <DatePicker onChange={date => setStartDate(date)} selected={startDate} placeholderText="Date Of Birth"/>
                }
            />
        </div>
    )
}