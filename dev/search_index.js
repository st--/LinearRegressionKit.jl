var documenterSearchIndex = {"docs":
[{"location":"basic_tutorial/#Tutorial-Linear-Regression-Basics","page":"Basic","title":"Tutorial Linear Regression Basics","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"This tutorial details a simple regression analysis based on the \"Formaldehyde\" dataset.","category":"page"},{"location":"basic_tutorial/#First,-creating-the-dataset","page":"Basic","title":"First, creating the dataset","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"This is done relying on the DataFrames.jl package.","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"using DataFrames\ndf = DataFrame(Carb=[0.1,0.3,0.5,0.6,0.7,0.9], OptDen=[0.086,0.269,0.446,0.538,0.626,0.782])","category":"page"},{"location":"basic_tutorial/#Second,-the-model-is-defined","page":"Basic","title":"Second, the model is defined","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"We want OptDen as the dependent variable (the response) and Carb as the independent variable (the predictor). Our model will have an intercept; however, the package will implicitly add the intercept to the model. We define the model as Optden ~ Carb; the variable's names need to be column names from the DataFrame, which is the second argument to the regress function. The lm object will then present essential information from the regression.","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"using LinearRegression\nusing StatsModels # this is requested to use the @formula\n\nlm = regress(@formula(OptDen ~ Carb), df)","category":"page"},{"location":"basic_tutorial/#Third,-some-illustration-about-the-model-is-created","page":"Basic","title":"Third, some illustration about the model is created","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"Here we will only look at the fit-plot. To obtain it, we only need to add a third argument to the regress function. Namely, the name of the plot requested (\"fit\"). When at least one plot is requested, the regress function will return a pair of objects: the information about the regression (as before), and an object (Dict) to access the requested plot(s).","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"using VegaLite # this is the package use for plotting\n\nlm, ps = regress(@formula(OptDen ~ Carb), df, \"fit\")\nps[\"fit\"]","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"The response is plotted on the y-axis, and the predictor is plotted on the x-axis. The dark orange line represents the regression equation. The dark grey band represents the confidence interval given the α (which defaults to 0.05 and gives a 95% confidence interval). The light grey band represents the individual prediction interval. Finally, the blue circles represent the actual observations from the dataset.","category":"page"},{"location":"basic_tutorial/#Fourth,-generate-the-predictions-from-the-model","page":"Basic","title":"Fourth, generate the predictions from the model","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"Here we get the predicted values from the model using the same Dataframe.","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"results = predict_in_sample(lm, df)","category":"page"},{"location":"basic_tutorial/#Fifth,-generate-the-others-statistics-about-the-model","page":"Basic","title":"Fifth, generate the others statistics about the model","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"In order to get all the statistics, one can use the \"all\" keyword as an argument of the req_stats argument.","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"results = predict_in_sample(lm, df, req_stats=\"all\")","category":"page"},{"location":"basic_tutorial/#Sixth,-generate-prediction-for-new-data","page":"Basic","title":"Sixth, generate prediction for new data","text":"","category":"section"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"We first create a new DataFrame that needs to use the same column names used in the model. In our case, there is only one column: \"Carb\".","category":"page"},{"location":"basic_tutorial/","page":"Basic","title":"Basic","text":"ndf = DataFrame(Carb= [0.11, 0.22, 0.55, 0.77])\npredictions = predict_out_of_sample(lm, ndf)","category":"page"},{"location":"#LinearRegression.jl-Documentation","page":"Home","title":"LinearRegression.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"LinearRegression.jl implements linear regression using the least-squares algorithm (relying on the sweep operator). This package is in the alpha stage. Hence it is likely that some bugs exist. Furthermore, the API might change in future versions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The usage aims to be straightforward, a call to regress to build a linear regression model, and a call to predict_in_sample to predict data using the built linear regression model. When predicting on data not present during the regression, use the predict_out_of_sample function as this does not require a response value (consequently, statistics that need a response, as the residuals, are not available.)","category":"page"},{"location":"","page":"Home","title":"Home","text":"The regress call will compute some statistics about the fitted model in addition to the coefficients. The statistics computed depend on the value of the req_stats argument.  The prediction functions compute predicted values together with some statistics. Like for the regress calls, the statistics computed depend on the value of the req_stats argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"When some analytical positive weights are used, a weighted regression is performed.","category":"page"},{"location":"#Statistics-related-to-the-regression-(the-fitting)","page":"Home","title":"Statistics related to the regression (the fitting)","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fitting the model generates some statistics dependent on the req_stats argument of the regress function.","category":"page"},{"location":"","page":"Home","title":"Home","text":"n, p, \"coefs\" and \"see\" are always computed\n\"mse\", \"sst\", \"rmse\", \"aic\",  \"sigma\", \"t_statistic\", \"vif\", \"r2\", \"adjr2\", \"stderror\", \"t_values\", \"p_values\", \"ci\",  are computed upon request.\nsome diagnostics can be requested as well. Here is the full list as Symbols [:diag_normality, :diag_ks, :diag_ad, :diag_jb, :diag_heteroskedasticity, :diag_white, :diag_bp ], \"diag_normality\" is a shortcut for [:diag_ks, :diag_ad, :diag_jb] and :diag_heteroskedasticity is a shortcut for [:diag_white, :diag_bp]. \n\"default\", includes the mandatory stats, and some of the optional statistics here as Symbols: [:coefs, :sse, :mse, :sst, :rmse, :sigma, :t_statistic, :r2, :adjr2, :stderror, :t_values, :p_values, :ci]\n\"all\" includes all availble statistics\n\"none\" include only the mandatory statistics","category":"page"},{"location":"","page":"Home","title":"Home","text":"The meaning for these statistics is given below.","category":"page"},{"location":"#Number-of-observations-and-variables","page":"Home","title":"Number of observations and variables","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The number of observations n used to fit the model.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The number of independent variables p used in the model.","category":"page"},{"location":"#Total-Sum-of-Squares","page":"Home","title":"Total Sum of Squares","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The Total Sum of Squares (SST) is calculated but not presented to the user. In case of model with intercept the SST is computed with the following:","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmSST=sum_i=1^nleft(y_i-baryright)^2","category":"page"},{"location":"","page":"Home","title":"Home","text":"And when there is no intercept with the following: ","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmSST=sum_i=1^n y_i^2","category":"page"},{"location":"#Error-Sum-of-Squares","page":"Home","title":"Error Sum of Squares","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The Error Sum of Squares (or SSE) also known as Residual Sum of Square (RSS). This package uses the sweep operator (Goodnight, J. (1979). \"A Tutorial on the SWEEP Operator.\" The American Statistician.) to compute the SSE.","category":"page"},{"location":"#Mean-Squared-Error","page":"Home","title":"Mean Squared Error","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The Mean Squared Error (MSE) is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmMSE = displaystylefracmathrmSSEn - p","category":"page"},{"location":"","page":"Home","title":"Home","text":"The Root Mean Squared Error (RMSE) is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmRMSE = sqrtmathrmMSE","category":"page"},{"location":"","page":"Home","title":"Home","text":"The MSE is the estimator of σ̂² unless at least one robust covariance estimator is requested.","category":"page"},{"location":"#R-and-Adjusted-R","page":"Home","title":"R² and Adjusted R²","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The R² (R2 or R-squared) see (https://en.wikipedia.org/wiki/Coefficientofdetermination) is calculated with the following formula: ","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmR^2 = 1 - displaystylefracmathrmSSEmathrmSST","category":"page"},{"location":"","page":"Home","title":"Home","text":"The Adjusted R² (ADJR2) is computed with the following formulas:","category":"page"},{"location":"","page":"Home","title":"Home","text":"when it is a model with an intercept:","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmADJR^2 = 1 - displaystyle frac(n-1)(1-mathrmR^2)n-p","category":"page"},{"location":"","page":"Home","title":"Home","text":"And when there is no intercept:","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmADJR^2 = 1 - displaystyle frac(n)(1-mathrmR^2)n-p","category":"page"},{"location":"#Akaike-information-criterion","page":"Home","title":"Akaike information criterion","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The Akaike information criterion is calculated with the Linear Regression specific formula:","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmAIC = displaystyle n ln left( fracmathrmSSEn right) + 2p","category":"page"},{"location":"#t_statistic-and-confidence-interval","page":"Home","title":"t_statistic and confidence interval","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The t_statistic is computed by using the inverse cumulative t_distribution (with quantile()) with parameter (n - p) at 1 - fracα2. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The standard errors of the coefficients are calculated by multiplying the Sigma (estimated by the MSE) with the pseudo inverse matrix (resulting from the sweep operator), out of which the square root of the diagonal elements are extracted.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The t-values are calculated as the coefficients divided by their standard deviation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The upper bound of the confidence interval for each coefficient is calculated as the coeffiecent + coefficient's standard error * t_statistic.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The lower bound of the confidence interval for each coefficient is calculated as the coeffiecent - coefficient's standard error * t_statistic.","category":"page"},{"location":"#p-values","page":"Home","title":"p-values","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The p-values are computed using the F Distribution, the degree of freedom for each coefficent.","category":"page"},{"location":"#Variance-inflation-factor","page":"Home","title":"Variance inflation factor","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Variance inflation factor (VIF) is calculated by taking the diagonal elements of the inverse of the correlation matrix formed by the independent variables.","category":"page"},{"location":"#PRESS-predicted-residual-error-sum-of-squares","page":"Home","title":"PRESS predicted residual error sum of squares","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The predicted residual error sum of squares is calculated by taking the sum of squares from the PRESS (see below the statistics related to predictions) of each observations. ","category":"page"},{"location":"#Robust-covariance-estimators","page":"Home","title":"Robust covariance estimators","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Robust Covariance estimator can be requested through the cov argument of the regress function. The options are (as Symbols):","category":"page"},{"location":"","page":"Home","title":"Home","text":":white: Heteroscedasticity \n:hc0: Heteroscedasticity\n:hc1: Heteroscedasticity)\n:hc2: Heteroscedasticity)\n:hc3: Heteroscedasticity)\n:nw: HAC (Heteroskedasticity and Autocorrelation Consistent estimator)","category":"page"},{"location":"#Heteroscedasticity-estimators","page":"Home","title":"Heteroscedasticity estimators","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The user can select estimators from above list. If the user select :white as an estimator then HC3 will be selected for a small size (n <= 250) otherwise HC0 will be selected. (see \"Using Heteroscedasticity Consitent Standard Errors in the Linear Regression Model\" J. Scott Long and Laurie H. Ervin (1998-2000)). If another estimator is requested it is provided. A list of estimator can be requested as in for instance cov=[:hc2, hc3]. Comprehensive descriptions of the estimators and their applications shoudl in found in a text book, here only a brief description of the implementation is provided. ","category":"page"},{"location":"#HC0","page":"Home","title":"HC0","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Having InvMat the pseudo inverse resulting from the sweep operator. And having xe being the matrix of the independent variables times the residuals. Then HC0 is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupHC0 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat)","category":"page"},{"location":"#HC1","page":"Home","title":"HC1","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Having n being the number of observations and p the number of variables. Then HC1 is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupHC1 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat  fracnn-p)","category":"page"},{"location":"#HC2","page":"Home","title":"HC2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The leverage or hat matrix is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupH = textupX (textupXX)^-1textupX","category":"page"},{"location":"","page":"Home","title":"Home","text":"xe is scaled by frac11 - H then ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupHC2 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat  )","category":"page"},{"location":"#HC3","page":"Home","title":"HC3","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"xe is scaled by frac1left( 1 - H right)^2 then ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupHC3 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat  )","category":"page"},{"location":"#Heteroskedasticity-and-autocorrelation-consistent-estimator-(HAC)","page":"Home","title":"Heteroskedasticity and autocorrelation consistent estimator (HAC)","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Newey-West estimator calculation is not documented yet. See reference implementation current implementation for details.","category":"page"},{"location":"#Statistics-related-to-the-prediction","page":"Home","title":"Statistics related to the prediction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Predicting values using independent variables and a model will generate predicted values and some additional statistics dependent on the value of the req_stats argument of the predict* functions. Here is a list of the available statistics: [:predicted, :residuals, :leverage, :stdp, :stdi, :stdr, :student, :rstudent, :lcli, :ucli, :lclp, :uclp, :press, :cooksd]","category":"page"},{"location":"#Predicted","page":"Home","title":"Predicted","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The predicted value is the sum of the dependant variable(s) multiplied by the coefficients from the regression and the intercept (if the model has one). The predicted value is also known as the Y-hat.","category":"page"},{"location":"#Residuals","page":"Home","title":"Residuals","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The residuals are here defined as the known responses variables minus the predicted values.","category":"page"},{"location":"#Leverage","page":"Home","title":"Leverage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The leverage for the i-th independent observation x_i when it is not a weighted regression is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmh_i = mathrmx_i (X X)^-1 x_i","category":"page"},{"location":"","page":"Home","title":"Home","text":"And as per below when it is a weighted regression with a vector of weights W with the i-th weight being w_i then the i-th leverage is calculated as such:","category":"page"},{"location":"","page":"Home","title":"Home","text":"mathrmh_i = mathrmw_i cdot  x_i (X W X)^-1 x_i","category":"page"},{"location":"#STDP","page":"Home","title":"STDP","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"STDP is the standard error of the mean predicted value, and is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupSTDP = sqrthatsigma^2 h_i ","category":"page"},{"location":"","page":"Home","title":"Home","text":"and for a weighted regression as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupSTDP = sqrthatsigma^2 h_i   w_i","category":"page"},{"location":"#STDI","page":"Home","title":"STDI","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"STDI is the standard error of the individual predicted value, and is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupSTDI = sqrthatsigma^2 (1 + h_i)","category":"page"},{"location":"","page":"Home","title":"Home","text":"and for a weighted regression as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupSTDI = sqrthatsigma^2 (1 + h_i)  w_i","category":"page"},{"location":"#STDR","page":"Home","title":"STDR","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"STDR is the standard error of the residual, and is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupSTDR = sqrthatsigma^2 (1 - h_i) ","category":"page"},{"location":"","page":"Home","title":"Home","text":"and for a weighted regression as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupSTDR = sqrthatsigma^2 (1 - h_i)  w_i","category":"page"},{"location":"#Student","page":"Home","title":"Student","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Student represents the standardized residuals, and is calculated by using the residuals over the standard error of the residuals.","category":"page"},{"location":"#RStudent","page":"Home","title":"RStudent","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"RStudent is the studentized residuals calculated as","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupRSTUDENT = sqrt fracn - p - 1n - p - textupstudent^2 ","category":"page"},{"location":"#LCLI","page":"Home","title":"LCLI","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"LCLI is the lower bound of the prediction interval and is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupLCLI = mathrmpredicted - ( mathrmt_statistic cdot mathrmSTDI )","category":"page"},{"location":"#UCLI","page":"Home","title":"UCLI","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"UCLI is the upper bound of the prediction interval and is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupUCLI = mathrmpredicted + ( mathrmt_statistic cdot mathrmSTDI )","category":"page"},{"location":"#LCLP","page":"Home","title":"LCLP","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"LCLP is the lower bound of the predicted mean confidence interval and is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupLCLP = mathrmpredicted - ( mathrmt_statistic cdot mathrmSTDP )","category":"page"},{"location":"#UCLP","page":"Home","title":"UCLP","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"UCLP is the upper bound of the predicted mean confidence interval and is calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupUCLI = mathrmpredicted + ( mathrmt_statistic cdot mathrmSTDP )","category":"page"},{"location":"#COOKSD","page":"Home","title":"COOKSD","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"COOKSD is the Cook's Distance for each predicted value, and is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupCOOKSD = frac1p fractextupSTDP^2textupSTDR^2 cdot textupstudent^2","category":"page"},{"location":"#PRESS","page":"Home","title":"PRESS","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"PRESS is the predicted residual error sum of squares and is calculated as ","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupPRESS = fractextupresiduals1 - textupleverage","category":"page"},{"location":"#Type-1-SS","page":"Home","title":"Type 1 SS","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Type 1 Sum of squares, are calculated as a by-product of the sweep operator.","category":"page"},{"location":"#Type-2-SS","page":"Home","title":"Type 2 SS","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Type 2 Sum of squares, are calculated using the pseudo-inverse matrix. The Type 2 SS of the ith independent variable is the square of the coefficient of the independent variable divided by the ith element of the diagonal from the pseudo-inverse matrix.","category":"page"},{"location":"#Pcorr-1-and-2","page":"Home","title":"Pcorr 1 and 2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"pcorr1 and pcorr2 are the squared partial correlation coefficient calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textuppcorr1 = fractextupType 1 SStextupType 1 SS+ textupSSE","category":"page"},{"location":"","page":"Home","title":"Home","text":"textuppcorr2 = fractextupType 2 SStextupType 2 SS+ textupSSE","category":"page"},{"location":"","page":"Home","title":"Home","text":"When there is an intercept in the model the pcorr1 and pcorr2 are considered missing for the intercept.","category":"page"},{"location":"#Scorr-1-and-2","page":"Home","title":"Scorr 1 and 2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"scorr1 and scorr2 are the squared semi-partial correlation coefficient calculated as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupscorr1 = fractextupType 1 SStextupSST","category":"page"},{"location":"","page":"Home","title":"Home","text":"textupscorr2 = fractextupType 2 SStextupSST","category":"page"},{"location":"","page":"Home","title":"Home","text":"When there is an intercept in the model the scorr1 and scorr2 are considered missing for the intercept.","category":"page"},{"location":"#General-remarks","page":"Home","title":"General remarks","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For all options and parameters they can be passed as a Vector{String} or a Vector{Symbol} or alternatively if only options is needed as a single String or Symbol. For instance \"all\", :all or [\"R2\", \"VIF\"] or [:r2, :vif]. ","category":"page"},{"location":"#Functions","page":"Home","title":"Functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"function regress(f::StatsModels.FormulaTerm, df::DataFrames.AbstractDataFrame; α::Float64=0.05, req_stats=[\"default\"], weights::Union{Nothing,String}=nothing, remove_missing=false, cov=[:none], contrasts=nothing)\n\nfunction regress(f::StatsModels.FormulaTerm, df::AbstractDataFrame, req_plots; α::Float64=0.05, req_stats=[\"default\"], weights::Union{Nothing,String}=nothing, remove_missing=false, cov=[:none], contrasts=nothing, plot_args=Dict(\"plot_width\" => 400, \"loess_bw\" => 0.6, residuals_with_density\" => false))\n\nfunction predict_out_of_sample(lr::linRegRes, df::AbstractDataFrame; α=0.05, req_stats=[\"none\"], dropmissingvalues=true)\n\nfunction predict_in_sample(lr::linRegRes, df::AbstractDataFrame; α=0.05, req_stats=[\"none\"], dropmissingvalues=true)\n\nfunction kfold(f, df, k, r = 1, shuffle=true; kwargs...)\n","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Content","page":"Home","title":"Content","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"weighted_regression_tutorial/#Tutorial-weighted-regression","page":"Weighted regression","title":"Tutorial weighted regression","text":"","category":"section"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"This tutorial gives a brief introduction to simple weighted regression using analytical weights. The tutorial makes use of the short dataset available on this sas blog post.","category":"page"},{"location":"weighted_regression_tutorial/#First,-creating-the-dataset.","page":"Weighted regression","title":"First, creating the dataset.","text":"","category":"section"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"We create the dataset with the help of the DataFrames.jl package.","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"using DataFrames\n    tw = [\n        2.3  7.4  0.058 \n        3.0  7.6  0.073 \n        2.9  8.2  0.114 \n        4.8  9.0  0.144 \n        1.3 10.4  0.151 \n        3.6 11.7  0.119 \n        2.3 11.7  0.119 \n        4.6 11.8  0.114 \n        3.0 12.4  0.073 \n        5.4 12.9  0.035 \n        6.4 14.0  0\n    ]\n    df = DataFrame(tw, [:y,:x,:w])","category":"page"},{"location":"weighted_regression_tutorial/#Second,-make-a-basic-analysis","page":"Weighted regression","title":"Second, make a basic analysis","text":"","category":"section"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"We make a simple linear regression.","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"using LinearRegression, StatsModels\nusing VegaLite\n\nf = @formula(y ~ x)\nlms, pss = regress(f, df, \"fit\")\nlms","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"And then the weighted regression version:","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"lmw, psw = regress(f, df, \"fit\", weights=\"w\")\nlmw","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"The output of the model indicates that this is a weighted regression. We also note that the number of observations is 10 instead of 11 for the simple regression. This is because the last observation weights 0, and as the package only uses positive weights, it is not used to fit the regression model.","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"For comparison, we fit the simple regression with only the first 10 observations.","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"df = first(df, 10)\nlms, pss = regress(f, df, \"fit\")\nlms","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"We can now realise that the coefficients are indeed differents with the weighted regression.","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"We can then contrast the fit plot from both regressions.","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"[pss[\"fit\"] psw[\"fit\"]]","category":"page"},{"location":"weighted_regression_tutorial/","page":"Weighted regression","title":"Weighted regression","text":"We note that the regression line is indeed \"flatter\" in the weighted regression case. We also note that the prediction interval is presented differently (using error bars), and it shows a different shape, reflecting the weights' importance.","category":"page"},{"location":"multi_tutorial/#Tutorial-multiple-linear-regression-with-categorical-variables","page":"Multiple regression","title":"Tutorial multiple linear regression with categorical variables","text":"","category":"section"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"This tutorial details a multiple regression analysis based on the \"carseat\" dataset (Information about car seat sales in 400 stores). This tutorial follows roughly the same steps done the datasets in the \"An Introduction to Statistical Learning\" book (https://www.statlearning.com/), from pages 119, 120, and 124.","category":"page"},{"location":"multi_tutorial/#First,-creating-the-dataset.","page":"Multiple regression","title":"First, creating the dataset.","text":"","category":"section"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"We create the dataset with the help of the DataFrames.jl and Download packages.","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"using Downloads, DataFrames, CSV\ndf = DataFrame(CSV.File(Downloads.download(\"https://raw.githubusercontent.com/Kulbear/ISLR-Python/master/data/Carseats.csv\")))\ndescribe(df)","category":"page"},{"location":"multi_tutorial/#Second,-basic-analysis.","page":"Multiple regression","title":"Second, basic analysis.","text":"","category":"section"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"We make a model with all variables and a couple of interactions.","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"using LinearRegression, StatsModels\nlm = regress(@formula(Sales ~ CompPrice + Income + Advertising + Population + Price + \n            ShelveLoc + Age + Education + Urban + US + Income & Advertising + Price & Age), df)","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"To have better explainability, we choose to set the base for the Shelve Location (ShelveLoc) as \"Medium\" so that the results highlight what happens when it is \"Bad\" or \"Good\". Furthermore, to form an idea about how collinear the predictors are, we request the Variance inflation factor (VIF).","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"lm = regress(@formula(Sales ~ CompPrice + Income + Advertising + Population + Price + \n            ShelveLoc + Age + Education + Urban + US + Income & Advertising + Price & Age), df, \n            req_stats=[\"default\", \"vif\"],\n            contrasts= Dict(:ShelveLoc => DummyCoding(base=\"Medium\"), :Urban => DummyCoding(base=\"No\"), :US => DummyCoding(base=\"No\") ))","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"Now let's assume we want our response to be Sales and the predictors to be Price, Urban, and US:","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"lm = regress(@formula(Sales ~ Price + Urban + US), df,\n            contrasts= Dict(:ShelveLoc => DummyCoding(base=\"Medium\"), :Urban => DummyCoding(base=\"No\"), :US => DummyCoding(base=\"No\") ))","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"Indeed, we note that \"Urban:Yes\" appears to have a low significance. Hence we could decide to make our model without this predictor:","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"lm = regress(@formula(Sales ~ Price + US), df,\n            contrasts= Dict(:ShelveLoc => DummyCoding(base=\"Medium\"), :Urban => DummyCoding(base=\"No\"), :US => DummyCoding(base=\"No\") ))","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"To identify potential outliers and high leverage variables, we choose to plot the Cook's Distance and the leverage plot.","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"using VegaLite\nlm, ps = regress(@formula(Sales ~ Price + US), df, \"all\", \n            req_stats=[\"default\", \"vif\"],\n            contrasts= Dict(:ShelveLoc => DummyCoding(base=\"Medium\"), :Urban => DummyCoding(base=\"No\"), :US => DummyCoding(base=\"No\") )) \np = [ps[\"leverage\"]\n    ps[\"cooksd\"]]","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"Alternatively, we can also use the predicted values and their statistics to create a new data frame with the entries of interest (here, we show only the first three entries).","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"results = predict_in_sample(lm, df, req_stats=\"all\")\n\nthreshold_cooksd = 4 / lm.observations\npotential_outliers = results[ results.cooksd .> threshold_cooksd , :]\npotential_outliers[1:3, 1:3]","category":"page"},{"location":"multi_tutorial/","page":"Multiple regression","title":"Multiple regression","text":"threshold_leverage = 2 * lm.p / lm.observations\npotential_highleverage = results[ abs.(results.leverage) .> threshold_leverage , : ]\npotential_highleverage[1:3, 1:3]","category":"page"}]
}
