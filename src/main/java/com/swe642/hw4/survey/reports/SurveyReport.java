package com.swe642.hw4.survey.reports;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Value;
import lombok.With;

import java.util.Date;

@Value
@Data
@With(AccessLevel.PACKAGE)
public class SurveyReport {
	public final Long id;
	public final String studentid;
	public final String studentname;
	public final Date surveydate;
	public final String street;
	public final String city;
	public final String state;
	public final String zip;
	public final String telnum;
	public final String email;
	public final String url;
	public final String[] liked;
	public final String heard;
	public final String gradmon;
	public final String gradyear;
	public final String recommend;
	public final String comments;
  
  public String toString(){
    return "ID: "+id+"\nStudentName: "+studentname+"\nStudentID: "+studentid+"\nSurvey date: "
      +surveydate+"\nStreet Address: "+street+"\nCity: "+city+"\nState: "+state+"\nZip: "
      +zip+"\nTelephone: "+telnum+"\nEmail: "+email+"\nHomepage: "
      +url+"\nLiked: "+liked+"\nHeard: "+heard+"\nGrad Month: "+gradmon+
      "\nGrad Year: "+gradyear+"\nRecommend: "+recommend+"\nComments: "+comments;
  }
}
