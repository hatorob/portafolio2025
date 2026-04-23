import { useForm } from "react-hook-form";
import Select, { type StylesConfig } from 'react-select';

export const ExperiencesAdmin = () => {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <h1>Crear Experiencia laboral</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Empresa</label>
          <input type="text" {...register('company')} />
        </div>
        <div>
          <label>Descripción Empresa</label>
          <textarea {...register('desc_company')}>
          </textarea>
        </div>
        <div>
          <label>Rol</label>
          <input type="text" {...register('rol')} />
        </div>
        <div>
          <label>Area</label>
          <input type="text" {...register('area')} />
        </div>
        <div className="contianer-date">
          <div>
            <label>Fecha de inicio</label>
            <input type="date" {...register('date_init')} />
          </div>
          <div>
            <label>Fecha de final</label>
            <input type="date" {...register('date_end')} />
          </div>
        </div>
        <button type="submit">enviar</button>
      </form>
    </div>
  )
}
