using StatsBase, LinearAlgebra , Distributions # for the density/histogram plot

function fitplot!(all_plots, results, lm, plot_args)

    lhs = terms(lm.updformula.lhs)
    rhs_noint = filter(isnotintercept, terms(lm.updformula.rhs))

    length(rhs_noint) == 0 && return nothing
    length(rhs_noint) > 1 && begin
        println("LinearRegressionKit: Fit plot was requested but not appropriate for regression with multiple independent variables")
        return nothing
    end
    length(lhs) == 0 && return nothing

    actx = first(rhs_noint).sym
    acty = first(lhs).sym
    acttitle = "Fit Plot: " * string(actx) * " vs " * string(acty)

    pred_interval = @vlplot(
            mark = {:errorband, color = "lightgrey"},
            y = { field = :ucli, type = :quantitative, title = acty} ,
            y2 = { field = :lcli, type = :quantitative }, 
            x = {actx, type = :quantitative})
    if lm.weighted
        pred_interval = @vlplot(
                mark = {:errorbar, ticks=true, color = "dimgrey"},
                y = { field = :ucli, type = :quantitative, title = acty} ,
                y2 = { field = :lcli, type = :quantitative }, 
                x = {actx, type = :quantitative})
    end

    fp = select(results, [actx, acty, :ucli, :lcli, :uclp, :lclp, :predicted]) |> @vlplot() + 
        pred_interval+ 
        @vlplot(
            mark = {:errorband, color = "darkgrey" },
            y = { field = :uclp, type = :quantitative, title = acty}, 
            y2 = { field = :lclp, type = :quantitative }, 
            x = {actx, type = :quantitative} ) + 
        @vlplot(
            mark = { :line, color = "darkorange" },
            x = {actx, type = :quantitative},
            y = {:predicted, type = :quantitative}) +
        @vlplot(
            :point, 
            x = { actx, type = :quantitative, axis = {grid = false}, scale = {zero = false}},
            y = { acty, type = :quantitative, axis = {grid = false}, scale = {zero = false}},
            title = acttitle, width = plot_args["plot_width"], height = plot_args["plot_width"]
        )

    all_plots["fit"] = fp
end
    
function simple_residuals_plot(results, dep_var=nothing, show_density=false, st_res=false; plot_width=400, loess_bandwidth::Union{Nothing,Float64}=0.99)
    if isnothing(dep_var)
        dep_var = :predicted
    end

    yaxis = :residuals
    if st_res == true
        yaxis = :student
    end
    
    loess_p = @vlplot()
    if !isnothing(loess_bandwidth)
        loess_p = @vlplot(
            transform = [ { loess = yaxis, on = dep_var, bandwidth = loess_bandwidth } ],
            mark = {:line, color = "firebrick"},
            x = {dep_var, type = :quantitative},
            y = {yaxis, type = :quantitative} )
    end

    title = "Residuals plot: $(string(dep_var))"
    if st_res == true
        title = "st " * title
    end
    sresults = select(results, [yaxis, dep_var])

    p = sresults |> 
    @vlplot(title = title, width = plot_width, height = plot_width,
        x = {type = :quantitative, axis = {grid = false}, scale = {zero = false, padding = 5}},
        y = {type = :quantitative, axis = {grid = false}}) +
    @vlplot(:point, 
       x = {dep_var, type = :quantitative}, 
       y = {yaxis, type = :quantitative}) +
    loess_p +
    @vlplot(mark = {:rule, color = :darkgrey}, y = {type = :quantitative, datum = 0})

    if show_density == false
        return p
    end

    mp = sresults |> @vlplot(
        width = 100, height = plot_width,
        mark = {:area, orient = "horizontal"},
        transform = [{density = yaxis, bandwidth = 0.5}],
        x = {"density:q", title = nothing, axis = nothing},
        y = {"value:q", title = nothing, axis = nothing } )
        
    tp = @vlplot(bounds = :flush, spacing = 5, config = {view = {stroke = :transparent}}) + [p mp]

    return tp
end

function residuals_plots!(all_plots, results, lm, plot_args)
    rhs_noint = filter(isnotintercept, terms(lm.updformula.rhs))
    plots = Vector{VegaLite.VLSpec}()
    length(rhs_noint) == 0 && return nothing

    plot_width = get(plot_args, "plot_width", 400)
    loess_bw = get(plot_args, "loess_bw", 0.6)
    density_requested = get(plot_args, "residuals_with_density", false)

    # main residual plot 
    all_plots["residuals"] = simple_residuals_plot(results, plot_width=plot_width, loess_bandwidth=loess_bw)
    all_plots["st residuals"] = simple_residuals_plot(results,nothing, false, true, plot_width=plot_width, loess_bandwidth=loess_bw)

    # additional plot per dependent variable
    for c_dependent_var in rhs_noint
        c_sym = c_dependent_var.sym
        show_density = density_requested && iscontinuousterm(c_dependent_var)
        all_plots[string("residuals ", string(c_sym))] = simple_residuals_plot(results, c_sym, show_density, plot_width=plot_width, loess_bandwidth=loess_bw)
        all_plots[string("st residuals ", string(c_sym))] = simple_residuals_plot(results, c_sym, show_density, true, plot_width=plot_width, loess_bandwidth=loess_bw)
    end

end

function qqplot(results, fitted_residuals, plot_width)
    n = length(results.residuals)
    grid = [1 / (n - 1):1 / (n - 1):1 - (1 / (n - 1));]
    qu_theo = quantile.(fitted_residuals, grid)
    qu_empi = quantile(results.residuals, grid)
    qqdf = DataFrame(x=qu_theo, y=qu_empi)
    qqline = [first(qu_theo), last(qu_theo)]
    qqldf = DataFrame(x=qqline, y=qqline)

    qqplot = qqdf |> @vlplot() + @vlplot(
        title = "Residuals QQ-Plot", 
        width = plot_width, height = plot_width, 
        :point,
        x = { :x, type = :quantitative, title = "Theoritical quantiles", axis = {grid = false}, scale = {zero = false, padding = 5} }, 
        y = { :y, type = :quantitative, title = "Empirical quantiles", axis = {grid = false}, scale = {zero = false, padding = 5} }
        ) + @vlplot(
        {:line, color = "darkgrey"}, 
        data = qqldf, x = {:x, type = :quantitative}, y = {:y, type = :quantitative} )

    return qqplot
end

function default_range(dist::Distribution, alpha=0.0001)
    minval = isfinite(minimum(dist)) ? minimum(dist) : quantile(dist, alpha)
    maxval = isfinite(maximum(dist)) ? maximum(dist) : quantile(dist, 1 - alpha)
    minval, maxval
end

rice_rule(obs) = round(Int, 2. * obs^(1 / 3))

function histogram_density(results, fitted_residuals, plot_width)
    # data for the density curve
    frmin, frmax = default_range(fitted_residuals)
    rangetest = (frmax - frmin) / plot_width
    qpdf = [pdf(fitted_residuals, x) for x in frmin:rangetest:frmax]
    xs = [x for x in frmin:rangetest:frmax]
    tdf = DataFrame(x=xs, y=qpdf)

    # data for the histogram
    hhh = fit(Histogram, results.residuals)
    nhh = normalize(hhh)
    all_edges = collect(first(nhh.edges))
    bin_starts = [x for x in all_edges[1:end - 1]]
    bin_ends = [x for x in all_edges[2:end]]
    counts = nhh.weights

    hdf = DataFrame(bs=bin_starts, be=bin_ends, y=counts)
    step_size = bin_starts[2] - bin_starts[1]

    hdplot = hdf |> @vlplot(width = plot_width, height = plot_width, title = "Residuals: histogram and PDF") +
    @vlplot(
        :bar, 
        x = {:bs, type = :quantitative, title = "residuals", bin = {binned = true, step = step_size}, axis = {grid = false}},
        x2 = {:be, type = :quantitative}, 
        y = {:y, type = :quantitative, stack = "zero",  axis = {grid = false} } ) +
    @vlplot(
        data = tdf,
        {:line, color = "darkorange"}, 
        x = {:x, type = :quantitative, scale = {zero = false}, axis = {grid = false}},
        y = {:y, type = :quantitative, scale = {zero = false}, axis = {grid = false}} ) 

    return hdplot
end

function normality_plots!(all_plots, results, lm, plot_args)
    # plots = Vector{VegaLite.VLSpec}()
    plot_width = get(plot_args, "plot_width", nothing)
    fitted_residuals = fit(Normal, results.residuals)

    all_plots["qq plot"] = qqplot(results, fitted_residuals, plot_width)
    all_plots["histogram density"] = histogram_density(results, fitted_residuals, plot_width)
end

function cooksd_plot!(all_plots, results, lm, plot_args)
    plot_width = get(plot_args, "plot_width", nothing)
    plot_height = plot_width / 2

    sdf = select(results, [:cooksd])
    sdf.Observations = rownumber.(eachrow(sdf))

    threshold_cooksd = 4 / lm.observations
    p = sdf |> 
        @vlplot(title = "Cook's Distance", width = plot_width, height = plot_height) +
        @vlplot(mark = {:rule, color = :darkgrey}, y = {type = :quantitative, datum = threshold_cooksd}) +
        @vlplot(
            mark = {:rule, color = :steelblue},
            x = {:Observations, type = :quantitative, axis = {grid = false}},
            y = {type = :quantitative, datum = 0}, y2 = {:cooksd, type = :quantitative} ) 

    all_plots["cooksd"] = p
    end

function scalelocation_plot!(all_plots, results, lm, plot_args)
    plot_width = get(plot_args, "plot_width", nothing)
    sdf = select(results, [:predicted, :student])
    sdf.sqrtstudent = sqrt.(abs.(sdf.student))

    p = sdf |> 
        @vlplot() +
        @vlplot(
                title = "Scale and location plot" , 
                width = plot_width , height = plot_width,
                :point, 
                x = {:predicted, type = :quantitative, scale = {zero = false}, axis = { grid = false} },
                y = {:sqrtstudent, type = :quantitative, title = "√student", 
                    scale = {zero = false}, axis = { grid = false} }) + @vlplot(
                transform = [ { loess = :sqrtstudent, on = :predicted, bandwidth = 0.6 } ],
                mark = {:line, color = "firebrick"},
                x = {:predicted, type = :quantitative}, y = {:sqrtstudent, type = :quantitative} )
    all_plots["scale location"] = p
end

function leverage_plot!(all_plots, results, lm, plot_args)
    threshold_leverage = 2 * lm.p / lm.observations
    plot_width = plot_args["plot_width"]
    p = select(results, [:leverage, :rstudent]) |> 
        @vlplot(title = "Leverage vs Rstudent", width = plot_width, height = plot_width,
            x = {axis = {grid = false}}, y = {axis = {grid = false}}   ) +
        @vlplot(:point, 
            x = {:leverage, type = :quantitative},
            y = {:rstudent, type = :quantitative}) +
        @vlplot(mark = {:rule, color = :darkgrey}, y = {datum = -2}) +
        @vlplot(mark = {:rule, color = :darkgrey}, x = {datum = threshold_leverage}) +
        @vlplot(mark = {:rule, color = :darkgrey}, y = {datum = 2}) 
    all_plots["leverage"] = p
end

function escape_javascript!(vec)
    for i in 1:length(vec)
        vec[i] = replace(vec[i], "&"=>" ampersand ")
    end
end

function ridge_traceplots(rdf::AbstractDataFrame; width=400)
    nb_coefs = round(Int, (ncol(rdf) - 5) / 2)
    dfstats = names(rdf)[2:5]
    dfcoefs = nothing
    dfvifs = nothing

    all_names = names(rdf)
    escape_javascript!(all_names)

    if all_names[6] == "(Intercept)"
        dfcoefs = all_names[7:6 - 1 + nb_coefs]
        push!(dfcoefs, "(Intercept)")
        dfvifs = all_names[end - nb_coefs + 2:end]
    else
        dfcoefs = all_names[6:6 - 1 + nb_coefs]
        dfvifs = all_names[end - nb_coefs + 2:end]
    end

    traceplot = rdf |> @vlplot(title = "Ridge trace plot", width = width, height = width,
        transform = [
            {fold = dfcoefs},
        ],
        mark = :line,
        x = {field = :k , type = :quantitative, scale = {zero = false}, axis = { grid = false}} ,
        y = {field = :value, type = :quantitative, scale = {zero = false}, axis = { grid = false}},
        color = {field = :key, type = :nominal},
        )

    viftraceplot = rdf |> @vlplot(title = "VIF trace plot", width = width, height = width,
        transform = [
            {fold = dfvifs},
        ],
        mark = :line,
        x = {field = :k, type = :quantitative, scale = {zero = false}, axis = { grid = false}} ,
        y = {field = :value, type = :quantitative, scale = {type = :linear, zero = false}, axis = { grid = false} },
        color = {field = :key, type = :nominal},
        ) 

    viftraceplotlog = rdf |> @vlplot(title = "VIF trace plot", width = width, height = width,
        transform = [
            {fold = dfvifs},
        ],
        mark = :line,
        x = {field = :k, type = :quantitative, scale = {zero = false}, axis = { grid = false}} ,
        y = {field = :value, type = :quantitative, scale = {type = :log, zero = false}, axis = { grid = false} },
        color = {field = :key, type = :nominal},
        ) 

    rmse_r2_plot = select(rdf, ["k", "RMSE", "R2"]) |> @vlplot(title = "Trace plot", width = width, height = width,
        transform = [
            {fold = ["RMSE", "R2"]},
        ],
        mark = :line,
        x = {field = :k, type = :quantitative, scale = {zero = false}, axis = { grid = false}} ,
        y = {field = :value, type = :quantitative, scale = {zero = false}, axis = { grid = false}},
        color = {field = :key, type = :nominal},
    )

    return Dict([("coefs traceplot", traceplot), ("vifs traceplot", viftraceplot), ("vifs traceplot log", viftraceplotlog), ("rmse r2 plot", rmse_r2_plot)])
end
