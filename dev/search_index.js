var documenterSearchIndex = {"docs":
[{"location":"#LinearRegression.jl-Documentation","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"LinearRegression.jl implements linear regression using the least-squares algorithm (relying on the sweep operator). This package is in the alpha stage. Hence it is likely that some bugs exist. Furthermore, the API might change in future versions.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The usage aims to be straightforward, a call to regress to build a linear regression model, and a call to predict_in_sample to predict data using the built linear regression model.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The regress call will compute some statistics about the fitted model in addition to the coefficients. ","category":"page"},{"location":"#Number-of-observations-and-variables","page":"LinearRegression.jl Documentation","title":"Number of observations and variables","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The number of observations n used to fit the model.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The number of independent variables p used in the model.","category":"page"},{"location":"#Total-Sum-of-Squares","page":"LinearRegression.jl Documentation","title":"Total Sum of Squares","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The Total Sum of Squares (SST) is calculated but not presented to the user. In case of model with intercept the SST is computed with the following:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmSST=sum_i=1^nleft(y_i-baryright)^2","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"And when there is no intercept with the following: ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmSST=sum_i=1^n y_i^2","category":"page"},{"location":"#Error-Sum-of-Squares","page":"LinearRegression.jl Documentation","title":"Error Sum of Squares","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The Error Sum of Squares (or SSE) also known as Residual Sum of Square (RSS). This package uses the sweep operator (Goodnight, J. (1979). \"A Tutorial on the SWEEP Operator.\" The American Statistician.) to compute the SSE.","category":"page"},{"location":"#Mean-Squared-Error","page":"LinearRegression.jl Documentation","title":"Mean Squared Error","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The Mean Squared Error (MSE) is calculated as ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmMSE = displaystylefracmathrmSSEn - p","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The Root Mean Squared Error (RMSE) is calculated as ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmRMSE = sqrtmathrmMSE","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The MSE is the estimator of σ̂² unless at least one robust covariance estimator is requested.","category":"page"},{"location":"#R-and-Adjusted-R","page":"LinearRegression.jl Documentation","title":"R² and Adjusted R²","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The R² (R2 or R-squared) see (https://en.wikipedia.org/wiki/Coefficientofdetermination) is calculated with the following formula: ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmR^2 = 1 - displaystylefracmathrmSSEmathrmSST","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The Adjusted R² (ADJR2) is computed with the following formulas:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"when it is a model with an intercept:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmADJR^2 = 1 - displaystyle frac(n-1)(1-mathrmR^2)n-p","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"And when there is no intercept:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmADJR^2 = 1 - displaystyle frac(n)(1-mathrmR^2)n-p","category":"page"},{"location":"#Akaike-information-criterion","page":"LinearRegression.jl Documentation","title":"Akaike information criterion","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The Akaike information criterion is calculated with the Linear Regression specific formula:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"mathrmAIC = displaystyle n ln left( fracmathrmSSEn right) + 2p","category":"page"},{"location":"#t-statistic-and-confidence-interval","page":"LinearRegression.jl Documentation","title":"t-statistic and confidence interval","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The t-statistic is computed by using the inverse cumulative t-distribution (with quantile()) with parameter (n - p) at 1 - fracα2. ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The standard errors of the coefficients are calculated by multiplying the Sigma (estimated by the MSE) with the pseudo inverse matrix (resulting from the sweep operator), out of which the square root of the diagonal elements are extracted.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The t-values are calculated as the coefficients divided by their standard deviation.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The upper bound of the confidence interval for each coefficient is calculated as the coeffiecent + coefficient's standard error * t_statistic.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The lower bound of the confidence interval for each coefficient is calculated as the coeffiecent - coefficient's standard error * t_statistic.","category":"page"},{"location":"#p-values","page":"LinearRegression.jl Documentation","title":"p-values","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The p-values are computed using the F Distribution, the degree of freedom for each coefficent.","category":"page"},{"location":"#Variance-inflation-factor","page":"LinearRegression.jl Documentation","title":"Variance inflation factor","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"Variance inflation factor (VIF) is calculated by taking the  diagonal elements of the inverse of the correlation matrix formed by the independent variables.","category":"page"},{"location":"#Robust-covariance-estimators","page":"LinearRegression.jl Documentation","title":"Robust covariance estimators","text":"","category":"section"},{"location":"#Heteroscedasticity-estimators","page":"LinearRegression.jl Documentation","title":"Heteroscedasticity estimators","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The user can select estimators from these list. If the user select \"White\" as an estimator then HC3 will be selected for a small size (n < 250) otherwise HC0 will be selected.","category":"page"},{"location":"#HC0","page":"LinearRegression.jl Documentation","title":"HC0","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The following estimators can be calculated. Having InvMat the pseudo inverse resulting from the sweep operator. And having xe being the matrix of the independent variables times the residuals. Then HC0 is calculated as:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"textupHC0 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat)","category":"page"},{"location":"#HC1","page":"LinearRegression.jl Documentation","title":"HC1","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"Having n being the number of observations and p the number of variables. Then HC1 is calculated as:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"textupHC1 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat  fracnn-p)","category":"page"},{"location":"#HC2","page":"LinearRegression.jl Documentation","title":"HC2","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"The leverage or hat matrix is calculated as:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"textupH = textupX (textupXX)^-1textupX","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"xe is scaled by frac11 - H then ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"textupHC2 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat  )","category":"page"},{"location":"#HC3","page":"LinearRegression.jl Documentation","title":"HC3","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"xe is scaled by frac1left( 1 - H right)^2 then ","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"textupHC3 = sqrtdiag(textupInvMat  textupxe textupxe textup InvMat  )","category":"page"},{"location":"#Heteroskedasticity-and-autocorrelation-consistent-estimator","page":"LinearRegression.jl Documentation","title":"Heteroskedasticity and autocorrelation consistent estimator","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"Newey-West estimator calculation is not documented yet. See reference implementation current implementation for details.","category":"page"},{"location":"#Weighted-regression","page":"LinearRegression.jl Documentation","title":"Weighted regression","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"This version is the initial implementation of a weighted regression using analytical weights. Here is a minimal example illustrating its usage.","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"tw = [\n    2.3  7.4  0.058 \n    3.0  7.6  0.073 \n    2.9  8.2  0.114 \n    4.8  9.0  0.144 \n    1.3 10.4  0.151 \n    3.6 11.7  0.119 \n    2.3 11.7  0.119 \n    4.6 11.8  0.114 \n    3.0 12.4  0.073 \n    5.4 12.9  0.035 \n    6.4 14.0  0\n] # data from https://blogs.sas.com/content/iml/2016/10/05/weighted-regression.html\n\ndf = DataFrame(tw, [:y,:x,:w])\nf = @formula(y ~ x)\nlm, ps= regress(f, df, \"fit\", weights=\"w\")","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"Which gives the following output:","category":"page"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"Model definition:      y ~ 1 + x\nUsed observations:      3\nWeighted regression\nModel statistics:\n  R²: 0.96                      Adjusted R²: 0.92\n  MSE: 0.48                     RMSE: 0.69282\n  σ̂²: 0.48\nConfidence interval: 95%\n\nCoefficients statistics:\nTerms ╲ Stats │     Coefs    Std err          t   Pr(>|t|)     low ci    high ci\n──────────────┼─────────────────────────────────────────────────────────────────\n(Intercept)   │      -0.2    0.69282  -0.288675   0.821088   -9.00312    8.60312\nx             │      1.44   0.293939    4.89898   0.128188   -2.29485    5.17485","category":"page"},{"location":"#Functions","page":"LinearRegression.jl Documentation","title":"Functions","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"regress(f::StatsModels.FormulaTerm, df::DataFrames.DataFrame, req_plots; α::Float64=0.05, req_stats=[\"default\"], weights::Union{Nothing,String}=nothing, remove_missing=false, cov=[:none], contrasts=nothing, plot_args=Dict(\"plot_width\" => 400, \"loess_bw\" => 0.6, \"residuals_with_density\" => false))\nregress(f::StatsModels.FormulaTerm, df::DataFrames.DataFrame; α::Float64=0.05, req_stats=[\"default\"], weights::Union{Nothing,String}=nothing,remove_missing=false, cov=[:none], contrasts=nothing)\npredict_in_sample(lr::linRegRes, df::DataFrames.DataFrame; α=0.05, req_stats=[\"none\"], dropmissingvalues=true)\npredict_out_of_sample(lr::linRegRes, df::DataFrames.DataFrame; α=0.05, req_stats=[\"none\"], dropmissingvalues=true)\n","category":"page"},{"location":"#LinearRegression.regress-Tuple{FormulaTerm, DataFrame, Any}","page":"LinearRegression.jl Documentation","title":"LinearRegression.regress","text":"function regress(f::StatsModels.FormulaTerm, df::DataFrames.DataFrame, req_plots; α::Float64=0.05, req_stats=[\"default\"],\nweights::Union{Nothing,String}=nothing, remove_missing=false, cov=[:none], contrasts=nothing, \nplot_args=Dict(\"plot_width\" => 400, \"loess_bw\" => 0.6, \"residuals_with_density\" => false))\n\nEstimate the coefficients of the regression, given a dataset and a formula. and provide the requested plot(s).\nA dictionary of the generated plots indexed by the descritption of the plots.\n\nIt is possible to indicate the width of the plots, and the bandwidth of the Loess smoother.\n\n\n\n\n\n","category":"method"},{"location":"#LinearRegression.regress-Tuple{FormulaTerm, DataFrame}","page":"LinearRegression.jl Documentation","title":"LinearRegression.regress","text":"function regress(f::StatsModels.FormulaTerm, df::DataFrames.DataFrame; α::Float64=0.05, req_stats=[\"default\"], weights::Union{Nothing,String}=nothing,\nremove_missing=false, cov=[:none], contrasts=nothing)\n\nEstimate the coefficients of the regression, given a dataset and a formula. \n\nThe formula details are provided in the StatsModels package and the behaviour aims to be similar as what the Julia GLM package provides.\nThe data shall be provided as a DataFrame without missing data.\nIf remove_missing is set to true a copy of the dataframe will be made and the row with missing data will be removed.\nSome robust covariance estimator(s) can be requested through the ```cov``` argument.\nDefault contrast is dummy coding, other contrasts can be requested through the ```contrasts``` argument.\nFor a weighted regression, the name of column containing the analytical weights shall be identified by the ```weights``` argument.\n\n\n\n\n\n","category":"method"},{"location":"#LinearRegression.predict_in_sample-Tuple{linRegRes, DataFrame}","page":"LinearRegression.jl Documentation","title":"LinearRegression.predict_in_sample","text":"predict_in_sample(lr::linRegRes, df::DataFrames.DataFrame; α=0.05, req_stats=[\"none\"], dropmissingvalues=true)\n\nUsing the estimated coefficients from the regression make predictions, and calculate related statistics.\n\n\n\n\n\n","category":"method"},{"location":"#LinearRegression.predict_out_of_sample-Tuple{linRegRes, DataFrame}","page":"LinearRegression.jl Documentation","title":"LinearRegression.predict_out_of_sample","text":"function predict_out_of_sample(lr::linRegRes, df::DataFrames.DataFrame; α=0.05, req_stats=[\"none\"], dropmissingvalues=true)\n\nuse the coefficients from a regression make predictions based on data (not including the response variable) from a DataFrame.\n\n\n\n\n\n","category":"method"},{"location":"#Index","page":"LinearRegression.jl Documentation","title":"Index","text":"","category":"section"},{"location":"","page":"LinearRegression.jl Documentation","title":"LinearRegression.jl Documentation","text":"","category":"page"}]
}