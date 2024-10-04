// controllers/candidateController.js
const Candidate = require("../model/Candidate");

exports.registerCandidate = async (req, res) => {
  try {
    const { candidateId, ...candidateData } = req.body;
    const existingCandidate = await Candidate.findOne({ candidateId });

    if (existingCandidate) {
      return res.status(409).json({ message: 'Candidate already registered' });
    }

    const newCandidate = new Candidate({
      candidateId,
      ...candidateData,
    });

    await newCandidate.save();

    res.status(201).json({ message: 'Candidate registered successfully', candidateId: newCandidate.candidateId });
  } catch (error) {
    console.error('Error registering candidate:', error);
    res.status(500).json({ message: 'Error registering candidate', error: error.message });
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ candidateId: req.params.candidateId });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ message: 'Error fetching candidate', error: error.message });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const { minSalary, maxSalary, currency, ...updateData } = req.body;

    if (minSalary && maxSalary && currency) {
      updateData.desiredSalary = `${currency} ${minSalary}-${maxSalary}`;
    }

    const updatedCandidate = await Candidate.findOneAndUpdate(
      { candidateId: req.params.candidateId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate updated successfully', candidate: updatedCandidate });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ message: 'Error updating candidate', error: error.message });
  }
};