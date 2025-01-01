// controllers/SectionController.js
const Section = require('../models/SectionModel');

const SectionController = {
  getSectionsByCourse: async (req, res) => {
    const { courseId } = req.params;
    const {nic} = req.user; // Assuming `nic` is included in the token payload
  
    try {

      const result = await Section.getSectionsByCourseId(courseId, nic);
  
      if (result.error) {
        
        return res.status(403).json({ message: result.error });
      }
  
      const { enrollment_id, payment_status, sections } = result;
  
      // Group sections by week
      const weeks = sections.reduce((acc, section) => {
        const { week_id, ...rest } = section;
        if (!acc[week_id]) {
          acc[week_id] = { week_id, sections: [] };
        }
        acc[week_id].sections.push(rest);
        return acc;
      }, {});
  
      res.status(200).json({
        enrollment_id,
        payment_status,
        weeks: Object.values(weeks),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching sections." });
    }
  },
  getSectionsForAdmin:async  (req,res)=>{
    const courseId=req.params;
    
    try {

      const result = await Section.getSectionsForAdmin(courseId);
  
      if (result.error) {
        
        return res.status(403).json({ message: result.error });
      }
  
      const {sections } = result;
  
      // Group sections by week
      const weeks = sections.reduce((acc, section) => {
        const { week_id, ...rest } = section;
        if (!acc[week_id]) {
          acc[week_id] = { week_id, sections: [] };
        }
        acc[week_id].sections.push(rest);
        return acc;
      }, {});
  
      res.status(200).json({
        weeks: Object.values(weeks),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching sections." });
    }
  }
  ,
  
  createSection:async(req,res)=>{
    
    const sectionData=req.body.sectionData;
    try {
      const id =await Section.createSectionByCourseId(sectionData);
      
      res.status(200).json({sectionId:id});
    } catch (error) {
      console.log(error)
      res.status(400);
    }
  },

  



  // Section update logic
// controllers/sectionController.js

// Function to update the section status and return the updated value
updateSectionStatus : async (req, res) => {
  const { enrollmentId, sectionId } = req.params;
  const { mark_as_done } = req.body;

  try {
    // Update section status in the UserSection table
    const result = await Section.updateSectionStatus(enrollmentId, sectionId, mark_as_done);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Section not found or not updated" });
    }

    // Fetch the updated section from UserSection to return the new status
    const updatedSection = await Section.getUpdatedSectionStatus(enrollmentId, sectionId);
    
    res.status(200).json({
      message: "Section updated successfully",
      updatedSection: updatedSection[0], // Return the updated section with mark_as_done
    });
  } catch (error) {
    console.error("Error updating section status:", error);
    res.status(500).json({ message: "Failed to update section status" });

  }
},
  getMaxOrderByCourseId:async(req,res)=>{
    const {courseId,weekId}=req.params;
    try {
      const maxOrder=await Section.getMaxOrderByCourseId(courseId,weekId);
      
      res.status(200).json({maxOrder:maxOrder[0].order_id,success:true})
    } catch (error) {
      console.log(error)
      res.status(400).json({success:false})
    }
  },

};

module.exports = SectionController;
