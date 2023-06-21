import React from 'react';
import PreviewFiles from '../../PreviewFiles/PreviewFiles';

const Step4 = ({ handleChange, credentials}) => {

  return (
    <div className="step step4">
      <h2>Mes documents</h2>

      {/* cv */}
      <div className="formGroup file">
        <input
          type="file"
          name="cv"
          accept=".pdf,.png,.jpg,.jpeg"
          size={10}
          placeholder="CV"
          onChange={(e) => {
            handleChange(e)
          }}
        />
        <label 
          htmlFor="cv"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}  
        >CV</label>
        <p>
          <small>Formats acceptés : pdf, png, jpg, jpeg</small>
        </p>
        <p>
          <small>Max : 10 Mo</small>
        </p>
        {credentials?.userDetail?.cv && credentials?.userDetail?.cv.length > 0 && (
          <PreviewFiles isSwiper={true} files={credentials?.userDetail?.cv} />
        )}
      </div>

      {/* personalPicture */}
      <div className="formGroup file">
        <input
          type="file"
          name="personalPicture"
          accept=".png,.jpg,.jpeg"
          size={10000000}
          placeholder="Photo de profil"
          onChange={(e) => {
            handleChange(e)
          }}
        />
        <label 
          htmlFor="personalPicture"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}
        >Photo de profil</label>
        <p>
          <small>Formats acceptés : png, jpg, jpeg</small>
        </p>
        {credentials?.userDetail?.personalPicture && credentials?.userDetail?.personalPicture.length > 0 && (
          <PreviewFiles isSwiper={true} files={credentials?.userDetail?.personalPicture} />
        )}
      </div>

      {/* banner */}
      <div className="formGroup file">
        <input
          type="file"
          name="banner"
          size={10000000}
          accept=".png,.jpg,.jpeg"
          placeholder="Bannière"
          onChange={(e) => {
            handleChange(e)
          }}
        />
        <label 
          htmlFor="banner"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}
        >Bannière</label>
        <p>
          <small>Formats acceptés : png, jpg, jpeg</small>
        </p>
        <p>
          <small>Max : 10 Mo</small>
        </p>
        {credentials?.userDetail?.banner && credentials?.userDetail?.banner.length > 0 && (
          <PreviewFiles isSwiper={true} files={credentials?.userDetail?.banner} />
        )}
      </div>

      {/* files */}
      <div className="formGroup file">
        <input
          type="file"
          name="files"
          multiple
          size={10000000}
          accept=".pdf,.png,.jpg,.jpeg"
          placeholder="Autres fichiers"
          onChange={(e) => {
            handleChange(e)
          }}
        />
        <label 
          htmlFor="files"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}
        >Autres fichiers</label>
        <p>
          <small>Formats acceptés : pdf, png, jpg, jpeg</small>
        </p>
        <p>
          <small>Max : 10 Mo</small>
        </p>
        {credentials?.userDetail?.files && credentials?.userDetail?.files.length > 0 && (
          <PreviewFiles isSwiper={true} files={credentials?.userDetail?.files} />
        )}
      </div>

      {/* displayedOnFeed */}
      <div style={{ 
          display: 'flex', 
          flexDirection: 'column'
        }}>
        <label htmlFor="displayedOnFeed">Etre affiché dans le feed (oui par défaut)</label>
        <input
          type="checkbox"
          name="displayedOnFeed"
          placeholder="Je souhaite être visible sur le feed"
          defaultChecked={true}
          onChange={(e) => {
            handleChange(e)
          }}
        />
      </div>
      
    </div>
  );
};

export default Step4;