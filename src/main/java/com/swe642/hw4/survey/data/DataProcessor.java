package com.swe642.hw4.survey.data;

import java.util.Arrays;

public class DataProcessor {
	//provides method to compute mean and std dev of 10 numbers entered
	//data processor
	private double meanVal=0;
	private double stdDevVal=0;
	private int maxVal=0;
	
	//constructor	
	public DataProcessor(String vals) {
		String[] s = vals.split(",");
		int[] array = Arrays.stream(s).mapToInt(Integer::parseInt).toArray();
		this.meanVal = calcMean(array);
		this.maxVal = calcMax(array);
		this.stdDevVal = calcStdDev(array, this.meanVal);		
	}
	private int calcMax(int[] vals) {
		int cnt = 0;
		int max = 0;
		for(cnt=0; cnt<vals.length; cnt++) {
			//compares current max value to current value
			if(vals[cnt]>max) {
				max =vals[cnt];
			}				
		}
		return max;
	}
	private double calcMean(int[] vals) {
		//calculates the mean and max values for the set
		//returns the mean value
		int total = 0;
		int cnt = 0;
		int max = 0;
		double mean = 0;
		
		for(cnt=0; cnt<vals.length; cnt++) {
			int v = vals[cnt];
			//adds the new value to the total
			total +=v;
			//compares current max value to current value
			if(v>max) {
				max =v;
			}				
		}
		mean = total/(cnt+1);
		return mean;
	}
	private double calcStdDev(int[] vals, double avg) {
		int total = 0; 
		int cnt = 0;		
		double s_sq=0;
		double stdDev = 0;
		
		for(cnt=0; cnt<vals.length; cnt++) {
			int v = vals[cnt];
			//find the difference between the current value and the mean
			double dif = v-avg;			
			//square the difference
			dif = dif*dif;			
			//add the square to the total
			total +=dif;							
		}
		//increment cnt for 0 based array
		cnt++;
		//divide total of the squares by the total number of values
		s_sq = total/cnt;
		//take the square root of the previous number
		stdDev = Math.sqrt(s_sq);
		
		return stdDev;
	}
	//returns mean value
	public double getMean() {
		return meanVal;
	}
	
	//returns standard deviation
	public double getStdDev() {
		return stdDevVal;
	}
	
	//returns max value
	public int getMaxVal() {
		return maxVal;
	}
}
