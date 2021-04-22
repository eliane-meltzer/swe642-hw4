package com.swe642.hw4.survey.reports;

import lombok.AccessLevel;
import lombok.Value;
import lombok.With;

@Value
@With(AccessLevel.PACKAGE)
public class SurveyReport {
	public Long id;
	public String studentid;
	public String studentname;
	public String surveydate;
	public String street;
	public String city;
	public String state;
	public String zip;
	public String telnum;
	public String email;
	public String url;
	public String liked;
	public String heard;
	public String gradmon;
	public String gradyear;
	public String recommend;
	public String comments;
	
  
  public String toString(){
    return "ID: "+id+"\nStudentName: "+studentname+"\nStudentID: "+studentid+"\nSurvey date: "
      +surveydate+"\nStreet Address: "+street+"\nCity: "+city+"\nState: "+state+"\nZip: "
      +zip+"\nTelephone: "+telnum+"\nEmail: "+email+"\nHomepage: "
      +url+"\nLiked: "+liked+"\nHeard: "+heard+"\nGrad Month: "+gradmon+
      "\nGrad Year: "+gradyear+"\nRecommend: "+recommend+"\nComments: "+comments;
  }
}
