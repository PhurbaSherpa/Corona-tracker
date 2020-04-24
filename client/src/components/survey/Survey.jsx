import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import StepButton from '@material-ui/core/StepButton';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import SurveyPage1 from './SurveyPage1';
import SurveyPage2 from './SurveyPage2';
import SurveyPage3 from './SurveyPage3';
import SurveyPage4 from './SurveyPage4';

const SurveyConnector = withStyles({
  lineHorizontal: {
    alignContent: 'center',
  },
  alternativeLabel: {
    top: 19,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(45deg, #667aff, #4760ff)',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#667aff',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#8EAEFB',
    borderRadius: 1,
  },
})(StepConnector);

const useSurveyStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#8EAEFB',
    zIndex: 1,
    color: '#505050',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  active: {
    backgroundImage: 'linear-gradient(45deg, #4760ff, #82a4f8)',
    boxShadow: '0px 1px 5px 0px #4760ff',
    color: '#fff',
  },
  completed: {
    backgroundColor: '#667aff',
  },
});

function SurveyStepIcon(props) {
  const classes = useSurveyStepIconStyles();
  const { active, completed, icon } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icon}
    </div>
  );
}

SurveyStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  icon: PropTypes.number.isRequired,
};

const useStyles = makeStyles(() => ({
  stepper: {
    backgroundColor: 'transparent',
    padding: 0,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Survey = props => {
  const { surveyPage } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(surveyPage - 1);
  const contentEl = document.getElementById('content');

  const handleStep = e => {
    const step = parseInt(e.target.innerText, 10);
    setActiveStep(step - 1);
  };

  useEffect(() => {
    if (contentEl) contentEl.scrollTop = 0;
    setActiveStep(surveyPage - 1);
  }, [surveyPage, contentEl]);

  return (
    <div>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        connector={<SurveyConnector />}
        className={classes.stepper}
      >
        {[1, 2, 3, 4].map(label => {
          return (
            <Step key={label}>
              <StepButton
                onClick={e => {
                  handleStep(e);
                }}
              >
                <StepLabel StepIconComponent={SurveyStepIcon} />
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && <SurveyPage1 />}
      {activeStep === 1 && <SurveyPage2 />}
      {activeStep === 2 && <SurveyPage3 />}
      {activeStep === 3 && <SurveyPage4 />}
    </div>
  );
};

Survey.propTypes = {
  surveyPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    surveyPage: state.surveyReducer.surveyPage,
  };
};

export default connect(mapStateToProps)(Survey);
